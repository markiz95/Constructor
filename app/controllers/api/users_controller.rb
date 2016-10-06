class Api::UsersController < ApplicationController
  respond_to :json

  def show
    user = User.find(params[:id])
    respond_with user.as_json(include: [{ sites: { include: [:tags, :user] } }, :comments] )
  end

end
