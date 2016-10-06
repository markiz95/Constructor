class Api::CommentsController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def create
    @site = Site.find(params[:site_id])
    comment = @site.comments.create(comment_params.merge(user_id: current_user.id))
    respond_with :api, @site, comment
  end

  def show
    @comment = Comment.find(params[:id])
    respond_with @comment
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

end
