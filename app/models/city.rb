class City < ActiveRecord::Base
  has_many :group_counts, dependent: :destroy
  has_many :categories, through: :group_counts
  has_many :similar_city_links, foreign_key: :source_city_id
  has_many :similar_cities, through: :similar_city_links, source: :target_city
  validates :meetup_id, :city, :state, :country, presence: true
end
