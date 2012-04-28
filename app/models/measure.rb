class Measure < ActiveRecord::Base
  belongs_to :state
  belongs_to :time_signature
  belongs_to :instrument
  belongs_to :chord
end
