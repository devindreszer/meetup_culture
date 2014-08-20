set :environment, "development"
set :output, {:error => "log/cron_error_log.log", :standard => "log/cron_log.log"}

# every 15.minutes do
#   rake "meetup:group_counts"
# end
