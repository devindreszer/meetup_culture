class GroupCount < ActiveRecord::Base
  belongs_to :city
  belongs_to :category

  def group_percentages
    self.group_count.to_f / self.city.total_groups
  end
end
