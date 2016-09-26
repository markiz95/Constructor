class CreateLayouts < ActiveRecord::Migration[5.0]
  def change
    create_table :layouts do |t|
      t.text :body, null: false
      t.string :name
      t.timestamps
    end
  end
end
