class SimilarCityLinksController < ApplicationController

  def default_serializer_options
    {root: false}
  end

  def index
    @similar_city_links = SimilarCityLink.all
    render json: @similar_city_links
  end

end
