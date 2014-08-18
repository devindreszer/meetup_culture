namespace :meetup do

  desc "Download group categories"
  task categories: :environment do
    response = MeetupData.new.categories
    response["results"].each do |category|
      Category.create!(
        meetup_id: category["id"].to_i,
        name: category["name"],
        shortname: category["shortname"]
      )
    end
  end

  desc "Download top 200 cities"
  task cities: :environment do
    response = MeetupData.new.cities
    response["results"].each do |city|
      City.create!(
        meetup_id: city["id"].to_i,
        city: city["city"],
        state: city["state"],
        country: city["country"],
        zip: city["zip"],
        lon: city["lon"].to_f,
        lat: city["lat"].to_f,
        ranking: city["ranking"].to_i,
        member_count: city["member_count"].to_i
      )
    end
  end

  desc "Download group count data for single city"
  task group_counts: :environment do
    last_group_count = GroupCount.last
    if last_group_count.present?
      city_id = last_group_count.city_id + 1
    else
      city_id = 1
    end
    city = City.find(city_id)
    Category.all.each do |category|
      response = MeetupData.new.group_count(city, category)
      GroupCount.create!(
        city_id: city.id,
        category_id: category.id,
        group_count: response["meta"]["total_count"]
      )
    end
  end

end
