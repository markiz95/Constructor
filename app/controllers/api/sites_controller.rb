class Api::SitesController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def index
    if params[:tag]
      sites = Site.tagged_with(params[:tag])
    else
      sites = Site.all
    end
    respond_with sites.as_json(
      include: [{ user: { only: [:image_url, :name] } }, { tags: { only: :name } }])
  end

  def create
    site = Site.create(site_params.merge(user_id: current_user.id))
    respond_with :api, site
  end

  def show
    site = Site.find(params[:id])
    respond_with site.as_json(
      include:
        [{ user: { only: :name } },
        { tags: { only: :name } },
        :pages ])
  end

  def updated
    respond_with Site.update(params[:id], site_params)
  end

  def destroy
    site = Site.find(params[:id])
    site.destroy
    respond_with { head :no_content }
  end

  private
  def site_params
    params.require(:site).permit(:name, :tag_list, :tag_list => [], pages_attributes: [:id, :name, :body])
  end

end
