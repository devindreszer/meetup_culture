class GroupCountSerializer < ActiveModel::Serializer
  attributes :city, :state, :category, :group_count, :group_percentage

  def category
    object.category.name
  end

  def city
    object.city.city
  end

  def state
    object.city.state
  end
end
