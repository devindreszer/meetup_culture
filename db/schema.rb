# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140817180415) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: true do |t|
    t.integer  "meetup_id",  null: false
    t.text     "name",       null: false
    t.text     "shortname",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cities", force: true do |t|
    t.integer  "meetup_id",    null: false
    t.integer  "ranking"
    t.integer  "member_count"
    t.text     "city",         null: false
    t.text     "state",        null: false
    t.text     "country",      null: false
    t.text     "zip"
    t.decimal  "lon"
    t.decimal  "lat"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "group_counts", force: true do |t|
    t.integer  "city_id"
    t.integer  "category_id"
    t.integer  "group_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "group_counts", ["category_id"], name: "index_group_counts_on_category_id", using: :btree
  add_index "group_counts", ["city_id"], name: "index_group_counts_on_city_id", using: :btree

end