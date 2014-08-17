class MeetupData
  BASE_URL= "http://api.meetup.com/"
  API_KEY = "key=#{ENV['MEETUP_KEY']}"
  @@remaining_cities = (0..199).to_a

  attr_accessor :city_id

  def initialize
    @city_id = @@remaining_cities.shift
  end

  def self.categories
    HTTParty.get("#{BASE_URL}2/categories.json/?#{API_KEY}")
  end

  def self.cities
    HTTParty.get("#{BASE_URL}/2/cities.json/?radius=1&country=us&#{API_KEY}")
  end

  def group_count(meetup_category_id)
    city = City.find(@city_id)
    HTTParty.get("#{BASE_URL}/2/groups.json/?
      radius=1&
      city=#{city.city}&
      state=#{city.state}&
      country=#{city.country}&
      category_id=#{meetup_category_id}&
      #{API_KEY}")
  end
end
