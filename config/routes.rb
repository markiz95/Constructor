Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, :defaults => { :format => :json } do
    resources :sites, except: [:new] do
      resources :pages, only: [:index, :create, :update]
    end
    resources :tags, only: :index
    resources :layouts, only: [:index, :create]
  end

  root to: 'application#angular'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  get '/me' => 'sessions#me'
  get '*path' => 'application#angular'
end
