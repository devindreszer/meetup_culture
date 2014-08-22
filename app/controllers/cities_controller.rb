class CitiesController < ApplicationController

  def default_serializer_options
    {root: false}
  end

  def index
    @cities = City.includes(:group_counts).where.not(group_counts: { category_id: nil })
    render json: @cities
  end

end
