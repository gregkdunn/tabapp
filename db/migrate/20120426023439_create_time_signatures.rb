class CreateTimeSignatures < ActiveRecord::Migration
  def change
    create_table :time_signatures do |t|
      t.integer :upper
      t.integer :lower

      t.timestamps
    end
  end
end
