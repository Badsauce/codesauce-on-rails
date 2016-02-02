class CreateInterests < ActiveRecord::Migration
  def change
    create_table :interests do |t|
      t.string :name
      t.string :email
      t.text :experince

      t.timestamps null: false
    end
  end
end
