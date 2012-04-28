class CreateAccents < ActiveRecord::Migration
  def change
    create_table :accents do |t|
      t.string :name
      t.string :symbol

      t.timestamps
    end
  end
end
