class Category < ActiveRecord::Base
  has_many :group_counts, dependent: :destroy
  has_many :cities, through: :group_counts
  validates :meetup_id, :name, :shortname, presence: true

  def total_groups
    self.group_counts.map(&:group_count).reduce(&:+)
  end

  def median_percentage
    group_percentages = self.group_counts.map(&:group_percentages)
    group_percentages.sort!
    length = group_percentages.length
    ((group_percentages[(length - 1) / 2] + group_percentages[length / 2]) / 2.0).to_f
  end
end
