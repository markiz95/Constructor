class SessionsController < ApplicationController
  respond_to :json

  def create
    @user = User.from_omniauth(request.env['omniauth.auth'])
    session[:user_id] = @user.id
    cookies[:user_id] = @user.id
    cookies[:user_role] = @user.role
    cookies[:user_image] = @user.image_url

    redirect_to root_path
  end

  def destroy
    if current_user
      session.delete(:user_id)
      cookies.delete(:user_id)
      cookies.delete(:user_role)
      cookies.delete(:user_image)
    end
    redirect_to root_path
  end


end
