class CreateSimilarCityLinks < ActiveRecord::Migration
  def change
    create_table :similar_city_links do |t|
      t.integer :source_city_id, index: true
      t.integer :target_city_id, index: true
    end
  end
end
