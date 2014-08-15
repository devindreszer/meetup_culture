class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.text :meetup_id, :name, :shortname, null: false
    end
  end
end
