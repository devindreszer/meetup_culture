namespace :meetup do

  desc "Download group categories"
  task categories: :environment do
    response = MeetupData.new.categories
    response["results"].each do |category|
      File.open('db/seeds.rb', mode="a") do |f|
        f.write("Category.create!(
          meetup_id: #{category["id"].to_i},
          name: '#{category["name"]}',
          shortname: '#{category["shortname"]}'
        )\n")
      end
    end
  end

  desc "Download top 200 cities"
  task cities: :environment do
    response = MeetupData.new.cities
    response["results"].each do |city|
      File.open('db/seeds.rb', mode="a") do |f|
        f.write("City.create!(
          meetup_id: #{city["id"].to_i},
          city: '#{city["city"]}',
          state: '#{city["state"]}',
          country: '#{city["country"]}',
          zip: '#{city["zip"]}',
          lon: #{city["lon"].to_f},
          lat: #{city["lat"].to_f},
          ranking: #{city["ranking"].to_i},
          member_count: #{city["member_count"].to_i}
        )\n")
      end
    end
  end

  desc "Download group count data for single city"
  task group_counts: [:environment, "db:reset"] do
    last_group_count = GroupCount.last
    if last_group_count.present?
      city_id = last_group_count.city_id + 1
    else
      city_id = 1
    end
    city = City.find(city_id)
    Category.all.each do |category|
      sleep(20)
      File.open('db/seeds.rb', mode="a") do |f|
        f.write("GroupCount.create!(city_id: #{city.id}, category_id: #{category.id}, group_count: #{MeetupData.new.group_count(city, category)})\n")
      end
    end
  end

  desc "Calculate values"
  task calculate_values: [:environment, "db:reset", :calculate_medians] do
    GroupCount.all.each do |group_count|
      group_count.is_over_median = group_count.group_percentage > group_count.category.median_percentage
      group_count.save!
    end
  end

  desc "Calculate medians"
  task calculate_medians: [:environment, "db:reset", :calculate_group_percentage] do
    cities = City.includes(:group_counts).where.not(group_counts: { category_id: nil })
    cities.each do |city|
      group_percentages = city.group_counts.map(&:group_percentage)
      group_percentages.sort!
      length = group_percentages.length
      city.median_percentage = ((group_percentages[(length - 1) / 2] + group_percentages[length / 2]) / 2.0).to_f

      city.save!
    end

    Category.all.each do |category|
      group_percentages = category.group_counts.map(&:group_percentage)
      group_percentages.sort!
      length = group_percentages.length
      category.median_percentage = ((group_percentages[(length - 1) / 2] + group_percentages[length / 2]) / 2.0).to_f

      category.save!
    end
  end

  desc "Calculate group percentage"
  task calculate_group_percentage: [:environment, "db:reset", :calculate_totals] do
    GroupCount.all.each do |group_count|
      group_count.group_percentage = group_count.group_count.to_f / group_count.city.total_groups
      group_count.save!
    end
  end

  desc "Calculate total_groups"
  task calculate_totals: [:environment, "db:reset"] do
    cities = City.includes(:group_counts).where.not(group_counts: { category_id: nil })
    cities.each do |city|
      city.total_groups = city.group_counts.pluck(:group_count).reduce(&:+)
      city.save!
    end

    Category.all.each do |category|
      category.total_groups = category.group_counts.map(&:group_count).reduce(&:+)
      category.save!
    end
  end

  desc "Find similar cities"
  task similar_cities: [:environment, :calculate_values] do
    cities = City.includes(:group_counts).where.not(group_counts: { category_id: nil })
    comparison_cities = cities

    results = {}
    cities.each do |city|
      city_comparison = {}

      comparison_cities.each do |comparison_city|
        similarities = 0

        city.group_counts.order(:category_id).each do |group_count|
          comparison_group_count = comparison_city.group_counts.find_by(category_id: group_count.category_id)
          similar = (group_count.is_over_median == comparison_group_count.is_over_median) ? 1 : 0
          similarities += similar
        end

        percent_similar = similarities.to_f / Category.count
        city_comparison[comparison_city] = percent_similar
      end

      similar_cities = (city_comparison.select do |comparison_city, percent_similar|
        (percent_similar >= (22.0/33) && comparison_city.id != city.id)
      end).keys

      similar_cities.each do |similar_city|
        SimilarCityLink.create!(source_city_id: city.id, target_city_id: similar_city.id)
      end
    end
  end
end
