class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.integer :meetup_id, null: false
      t.text :name, :shortname, null: false

      t.timestamps
    end
  end
end
