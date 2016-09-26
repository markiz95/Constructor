class ChangeComments < ActiveRecord::Migration[5.0]
  def up
    drop_table :comments
  end
end
