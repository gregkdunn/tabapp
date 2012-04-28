class CreateFingers < ActiveRecord::Migration
  def change
    create_table :fingers do |t|
      t.string :name
      t.string :symbol

      t.timestamps
    end
  end
end
