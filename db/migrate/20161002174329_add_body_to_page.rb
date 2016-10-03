class AddBodyToPage < ActiveRecord::Migration[5.0]
  def change
    change_table :pages do |t|
      t.text :body
    end
  end
end
