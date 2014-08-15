class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.integer :meetup_id, null: false
      t.integer :ranking, :member_count
      t.text :city, :state, :country, null: false
      t.text :zip
      t.decimal :lon, :lat

      t.timestamps
    end
  end
end
