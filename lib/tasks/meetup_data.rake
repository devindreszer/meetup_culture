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
end
