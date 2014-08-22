class AddMedianPercentageToCategories < ActiveRecord::Migration
  def change
    change_table :categories do |t|
      t.integer :total_groups
      t.decimal :median_percentage
    end
  end
end
