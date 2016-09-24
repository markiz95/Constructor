class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :body
      t.references :imageable, polymorphic: true, index: true
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
