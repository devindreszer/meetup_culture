class AddMedianPercentageToCities < ActiveRecord::Migration
  def change
    change_table :cities do |t|
      t.integer :total_groups
      t.decimal :median_percentage
    end
  end
end
