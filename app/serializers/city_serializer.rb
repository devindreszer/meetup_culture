class CitySerializer < ActiveModel::Serializer
  attributes :city, :state, :total_groups
  has_many :group_counts

  def total_groups
    object.total_groups
  end
end
