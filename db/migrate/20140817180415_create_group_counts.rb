class CreateGroupCounts < ActiveRecord::Migration
  def change
    create_table :group_counts do |t|
      t.references :city, index: true
      t.references :category, index: true
      t.integer :group_count

      t.timestamps
    end
  end
end
