class MeetupData
  BASE_URL= "http://api.meetup.com/"
  API_KEY = "key=#{ENV['MEETUP_KEY']}"

  def self.get_categories
    HTTParty.get("#{BASE_URL}2/categories.json/?#{API_KEY}")
  end

  def self.get_cities
    HTTParty.get("#{BASE_URL}/2/cities.json/?radius=1&country=us&#{API_KEY}")
  end
end
