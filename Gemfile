source 'https://rubygems.org'

gem 'rails', '4.1.4'

gem 'rails-api'

gem 'spring', :group => :development

gem 'pg'



# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.1.2'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', :group => :development

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

# Testing gems
group :development, :test do
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'rspec-rails'
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'poltergeist'
  gem 'shoulda-matchers'
end

# Serializer
gem 'active_model_serializers'

# Cross-Origin Resource Sharing
# allows HTTP Request from pages NOT served from this Rails App
gem 'rack-cors', :require => 'rack/cors'

# HTTParty
gem 'httparty', '~> 0.13.1'

# Hide secret key
gem 'dotenv-rails', groups: [:development, :test]

# Whenever for writing and deploying cron jobs
gem 'whenever', :require => false

# Heroku Deployment

group :production do
  gem 'rails_12factor'
end
