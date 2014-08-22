class AddIsOverMedianToGroupCounts < ActiveRecord::Migration
  def change
    change_table :group_counts do |t|
      t.boolean :is_over_median
    end
  end
end
