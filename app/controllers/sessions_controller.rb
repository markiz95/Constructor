class SessionsController < ApplicationController
  respond_to :json

  def create
    begin
      @user = User.from_omniauth(request.env['omniauth.auth'])
      session[:user_id] = @user.id
      cookies[:user_id] = @user.id


      flash[:success] = "Welcome, #{@user.name}!"
    rescue
      flash[:warning] = "There was an error while trying to authenticate you..."
    end
    redirect_to root_path
  end

  def destroy
    if current_user
      session.delete(:user_id)
      cookies.delete(:user_id)
      flash[:success] = 'See you!'
    end
    redirect_to root_path
  end

  def failure
    redirect_to root_url, alert: "Authentication failed, please try again."
  end

  def me
    respond_with current_user
  end

end
