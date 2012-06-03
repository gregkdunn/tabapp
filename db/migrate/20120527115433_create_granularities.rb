class CreateGranularities < ActiveRecord::Migration
  def change
    create_table :granularities do |t|
      t.string :name
      t.string :class

      t.timestamps
    end
  end
end
