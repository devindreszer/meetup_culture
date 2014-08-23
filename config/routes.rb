Rails.application.routes.draw do
  resources :categories, only: :index
  resources :cities, only: :index
  resources :similar_city_links, only: :index
end
