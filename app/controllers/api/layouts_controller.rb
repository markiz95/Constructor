class Api::LayoutsController < ApplicationController
  respond_to :json

  def index
    @name_body = Layout.pluck(:name, :body)
    respond_with @name_body
  end



end
