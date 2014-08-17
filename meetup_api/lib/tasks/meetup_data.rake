namespace :meetup do

  desc "Download group categories"
  task categories: :environment do
    response = MeetupData.categories
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
    response = MeetupData.cities
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

  desc "Download group count data"
  task group_counts: :environment do
    meetup_data = MeetupData.new
    Category.all.each do |category|
      response = meetup_data.group_count(category.meetup_id)
      GroupCount.create!(
        city_id: meetup_data.city_id,
        category_id: category.id,
        group_count: response["meta"]["total_count"]
      )
    end
  end

end
