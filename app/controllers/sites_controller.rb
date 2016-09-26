class SitesController < ApplicationController
  autocomplete :tag, :name, :full => true

  def new
    @site = Site.new
  end

  def create
    @site = Site.new(site_params)
    if @site.save?
      redirect_to sites_path(@site)
    else
      render new
    end
  end

  def show
    @site = Site.find(params[:id])
  end

  private
  def site_params
    params.require(:site).permit(:name, :user_id, :tag_list)
  end

end
