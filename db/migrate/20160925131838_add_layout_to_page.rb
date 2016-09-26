class AddLayoutToPage < ActiveRecord::Migration[5.0]
  def change
    change_table :pages do |t|
      t.belongs_to :layout, index: true
    end
  end
end
