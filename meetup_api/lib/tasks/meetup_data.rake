namespace :meetup do

  desc "Download group categories"
  task categories: :environment do
    response = MeetupData.get_categories
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
    response = MeetupData.get_cities
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

end
