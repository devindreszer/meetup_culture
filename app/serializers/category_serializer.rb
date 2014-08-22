class CategorySerializer < ActiveModel::Serializer
  attributes :name, :total_groups, :median_percentage
  has_many :group_counts

  def total_groups
    object.total_groups
  end

  def median_percentage
    object.median_percentage
  end
end
