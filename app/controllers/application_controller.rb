class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def angular
    render 'layouts/application'
  end

  private
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  helper_method :current_user
end
