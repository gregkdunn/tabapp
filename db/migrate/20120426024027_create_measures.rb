class CreateMeasures < ActiveRecord::Migration
  def change
    create_table :measures do |t|
      t.references :state
      t.references :time_signature
      t.references :instrument
      t.references :chord
      t.string :data
      t.string :encrypted

      t.timestamps
    end
    add_index :measures, :state_id
    add_index :measures, :time_signature_id
    add_index :measures, :instrument_id
    add_index :measures, :chord_id
  end
end
