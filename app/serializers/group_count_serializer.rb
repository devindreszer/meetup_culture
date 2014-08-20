class GroupCountSerializer < ActiveModel::Serializer
  attributes :city, :state, :group_count, :group_percentages

  def city
    object.city.city
  end

  def state
    object.city.state
  end

  def group_percentages
    object.group_count.to_f / object.city.total_groups
  end
end
