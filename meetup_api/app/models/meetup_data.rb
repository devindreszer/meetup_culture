class MeetupData
  BASE_URL= "http://api.meetup.com/"
  API_KEY = "key=#{ENV['MEETUP_KEY']}"

  def categories
    HTTParty.get("#{BASE_URL}2/categories.json/?#{API_KEY}")
  end

  def cities
    HTTParty.get("#{BASE_URL}/2/cities.json/?radius=1&country=us&#{API_KEY}")
  end

  def group_count(city, category)
    city_name = city.city.gsub(' ', '+')
    HTTParty.get("#{BASE_URL}/2/groups.json/?radius=1&city=#{city_name}&state=#{city.state}&country=#{city.country}&category_id=#{category.meetup_id}&#{API_KEY}")
  end
end
