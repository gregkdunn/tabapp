class CreateChords < ActiveRecord::Migration
  def change
    create_table :chords do |t|
      t.string :name
      t.string :notes

      t.timestamps
    end
  end
end
