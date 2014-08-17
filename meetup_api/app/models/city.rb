class City < ActiveRecord::Base
  validates :meetup_id, :city, :state, :country, presence: true
end
