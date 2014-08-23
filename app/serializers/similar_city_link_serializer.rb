class SimilarCityLinkSerializer < ActiveModel::Serializer
  attributes :source, :target

  def source
    object.source_city.city
  end

  def target
    object.target_city.city
  end
end
