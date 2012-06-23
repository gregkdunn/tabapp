class CreateGranularities < ActiveRecord::Migration
  def change
    create_table :granularities do |t|
      t.string :name
      t.string :class_name

      t.timestamps
    end
  end
end
