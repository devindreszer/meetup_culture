class MeetupData
  BASE_URL= "http://api.meetup.com"
  API_KEY = "key=#{ENV['MEETUP_KEY']}"

  def categories
    HTTParty.get("#{BASE_URL}/2/categories.json/?#{API_KEY}")
  end

  def cities
    HTTParty.get("#{BASE_URL}/2/cities.json/?radius=1&country=us&#{API_KEY}")
  end

  def group_count(city, category)
    location = "#{city.city.gsub(' ', '+')}+#{city.state}"
    count = 0
    offset = 0
    length = 200

    while length == 200
      response = HTTParty.get("#{BASE_URL}/find/groups?location=#{location}&country=#{city.country}&category=#{category.meetup_id}&page=200&offset=#{offset}&#{API_KEY}")
      length = response.length
      count += length
      offset += 1
    end
    count
  end
end
