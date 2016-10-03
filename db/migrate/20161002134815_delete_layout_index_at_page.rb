require_relative '20160925131838_add_layout_to_page'

class DeleteLayoutIndexAtPage < ActiveRecord::Migration[5.0]
  def change
    revert AddLayoutToPage

  end
end
