class Category < ActiveRecord::Base
  validates :meetup_id, :name, :shortname, presence: true
end
