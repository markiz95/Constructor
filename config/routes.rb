Rails.application.routes.draw do

  namespace :api, :defaults => { :format => :json } do
    resources :sites, except: [:new] do
      resources :pages, only: [:index, :create, :update, :show]
      resources :comments, only: [:show, :create]
      member do
        put '/upviews' => 'sites#upviews'
      end
    end
    resources :tags, only: :index
    resources :users, only: :show
    resources :layouts, only: [:index, :create]
  end

  root to: 'application#angular'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  get '/me' => 'sessions#me'
  get '*path' => 'application#angular'
end
