class SimilarCityLink < ActiveRecord::Base
  belongs_to :source_city, class_name: "City"
  belongs_to :target_city, class_name: "City"
end
