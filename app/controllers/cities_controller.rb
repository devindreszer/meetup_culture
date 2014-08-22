class CitiesController < ApplicationController

  def default_serializer_options
    {root: false}
  end

  def index
    @cities = City.all
    render json: @cities
  end

end
