class GroupCountSerializer < ActiveModel::Serializer
  attributes :city, :group_count

  def city
    object.city.city
  end
end
