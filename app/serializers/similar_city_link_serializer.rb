class SimilarCityLinkSerializer < ActiveModel::Serializer
  attributes :source, :target

  def source
    {
      city: object.source_city.city,
      state: object.source_city.state
    }
  end

  def target
    {
      city: object.target_city.city,
      state: object.target_city.state
    }
  end
end
