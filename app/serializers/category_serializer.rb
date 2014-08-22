class CategorySerializer < ActiveModel::Serializer
  attributes :name, :total_groups, :median_percentage
  has_many :group_counts
end
