class TagsController < ApplicationController
  respond_to :json

  def index
    @names = Tag.pluck :name
    respond_with @names
  end
end
