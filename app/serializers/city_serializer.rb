class CitySerializer < ActiveModel::Serializer
  attributes :city, :state, :total_groups, :selection
  has_many :group_counts

  def selection
    "#{object.city}, #{object.state}"
  end
end
