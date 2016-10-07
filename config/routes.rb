Rails.application.routes.draw do
  root to: 'application#angular'

  namespace :api, :defaults => { :format => :json } do
    resources :sites, except: :new  do
      resources :pages, only: :show
      resources :comments, only: [:show, :create]
      get 'search', on: :collection
      put 'upviews', on: :member
    end
    resources :tags, only: :index
    resources :users, only: :show
    resources :layouts, only: [:index, :create]
  end

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  get '*path' => 'application#angular'
end
