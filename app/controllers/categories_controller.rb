class CategoriesController < ApplicationController

  def default_serializer_options
    {root: false}
  end

  def index
    @categories = Category.all
    render json: @categories
  end

end
