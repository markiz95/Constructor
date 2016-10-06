class AddViewsToSite < ActiveRecord::Migration[5.0]
  def change
    add_column :sites, :views, :integer, default: 0
  end
end
