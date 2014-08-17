class City < ActiveRecord::Base
  has_many :group_counts, dependent: :destroy
  has_many :categories, through: :group_counts
  validates :meetup_id, :city, :state, :country, presence: true
end
