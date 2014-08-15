namespace :meetup do

  desc "Download group categories"
  task categories: :environment do
    response = MeetupData.get_categories
    response["results"].each do |category|
      Category.create!(
        meetup_id: category["id"],
        name: category["name"],
        shortname: category["shortname"]
      )
    end
  end

end
