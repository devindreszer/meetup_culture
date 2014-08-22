Rails.application.routes.draw do
  resources :categories, only: :index
  resources :cities, only: :index
end
