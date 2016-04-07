class AddPasswordToHistory < ActiveRecord::Migration
  def change
    add_column :histories, :password, :string, :default => nil
  end
end
