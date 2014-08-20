class CategorySerializer < ActiveModel::Serializer
  attributes :name
  has_many :group_counts
end
