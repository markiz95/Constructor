Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :sites do # , :defaults => { :format => :json }
    get :autocomplete_tag_name, :on => :collection
  end
  root to: 'application#angular'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  get '/tags' => 'tags#index'
  get '*path' => 'application#angular'
end
