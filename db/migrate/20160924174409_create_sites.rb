class CreateSites < ActiveRecord::Migration[5.0]
  def change
    create_table :sites do |t|
      t.string :name, null: false
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
