class GroupCount < ActiveRecord::Base
  belongs_to :city
  belongs_to :category

  def group_percentages
    self.group_count.to_f / self.city.total_groups
  end

  def is_over_median
    self.group_percentages > self.category.median_percentage
  end
end
