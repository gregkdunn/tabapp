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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120426024027) do

  create_table "accents", :force => true do |t|
    t.string   "name"
    t.string   "symbol"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "chords", :force => true do |t|
    t.string   "name"
    t.string   "notes"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "fingers", :force => true do |t|
    t.string   "name"
    t.string   "symbol"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "instruments", :force => true do |t|
    t.string   "name"
    t.string   "strings"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "measures", :force => true do |t|
    t.integer  "state_id"
    t.integer  "time_signature_id"
    t.integer  "instrument_id"
    t.integer  "chord_id"
    t.string   "data"
    t.string   "encrypted"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "measures", ["chord_id"], :name => "index_measures_on_chord_id"
  add_index "measures", ["instrument_id"], :name => "index_measures_on_instrument_id"
  add_index "measures", ["state_id"], :name => "index_measures_on_state_id"
  add_index "measures", ["time_signature_id"], :name => "index_measures_on_time_signature_id"

  create_table "states", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "time_signatures", :force => true do |t|
    t.integer  "upper"
    t.integer  "lower"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
