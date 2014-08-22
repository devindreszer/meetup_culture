class CategorySerializer < ActiveModel::Serializer
  attributes :name, :total_groups, :median_percentage
  has_many :group_counts

  def total_groups
    object.group_counts.map(&:group_count).reduce(&:+)
  end

  def median_percentage
    group_percentages = []
    object.group_counts.each do |group_count|
      group_percentages << (group_count.group_count.to_f / group_count.city.total_groups)
    end
    group_percentages.sort!
    length = group_percentages.length
    ((group_percentages[(length - 1) / 2] + group_percentages[length / 2]) / 2.0).to_f
  end
end
