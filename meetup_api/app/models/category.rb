class Category < ActiveRecord::Base
  has_many :group_counts, dependent: :destroy
  has_many :cities, through: :group_counts
  validates :meetup_id, :name, :shortname, presence: true
end
