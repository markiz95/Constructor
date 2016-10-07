class Api::SitesController < ApplicationController
  respond_to :json
  before_action :find_site, only: [:upviews, :show, :destroy, :update]
  skip_before_action :verify_authenticity_token

  def index
    if params[:tag]
      sites = Site.tagged_with(params[:tag])
    else
      sites = Site.all
    end
    respond_with sites.as_json(
      include: [{ user: { only: [:image_url, :name, :id] } },
                { tags: { only: :name } }])
  end

  def create
    site = Site.create(site_params.merge(user_id: current_user.id))
    respond_with :api, site
  end

  def show
    respond_with @site.as_json(
      include: [{ user: { only: [:image_url, :name, :id] } },
                { tags: { only: :name } }, :pages, comments: { include: :user } ])
  end

  def update
    @site.update_attributes(site_params)
    respond_with :api, @site
  end

  def upviews
    @site.increment!(:views)
  end

  def search
    @search = Sunspot.search(Site) do
      fulltext params[:search]
    end
    respond_with @search.results
  end

  def destroy
    @site.destroy
  end

  private

  def site_params
    params.require(:site)
    .permit(:name, :tag_list, :tag_list => [], pages_attributes: [:id, :name, :body])
  end

  def find_site
    @site = Site.find(params[:id])
  end

end
