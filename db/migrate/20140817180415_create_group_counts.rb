class CreateGroupCounts < ActiveRecord::Migration
  def change
    create_table :group_counts do |t|
      t.references :city, index: true
      t.references :category, index: true
      t.integer :group_count
      t.decimal :group_percentage

      t.timestamps
    end
  end
end
