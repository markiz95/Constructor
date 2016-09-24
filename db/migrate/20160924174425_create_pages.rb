class CreatePages < ActiveRecord::Migration[5.0]
  def change
    create_table :pages do |t|
      t.string :name, null: false
      t.belongs_to :site, index: true
      t.timestamps
    end
  end
end
