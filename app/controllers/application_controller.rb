class ApplicationController < ActionController::Base
  #  protect_from_forgery with: :exception
  include ActionController::MimeResponds
  before_action :force_json
  skip_before_action :force_json, only: :angular
  def force_json
     request.format = :json
  end

  def angular
    render 'layouts/application'
  end

  private
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  helper_method :current_user
end
