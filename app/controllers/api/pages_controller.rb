class PagesController < ApplicationController
  respond_to :json

  def index
  end
  def show
    respond_with Page.find(params[:id])
  end
end
