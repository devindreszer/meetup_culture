class CitySerializer < ActiveModel::Serializer
  attributes :city, :state, :total_groups
  has_many :group_counts
end
