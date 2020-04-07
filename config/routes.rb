Rails.application.routes.draw do

  devise_for :users, :controllers => { :registrations => "registrations"}
  root to: 'pages#index'

  devise_scope :user do
    get 'login', to: 'devise/sessions#new'
  end

  devise_scope :user do
    get 'signup', to: 'devise/registrations#new'
  end

  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy'
  end

  resources :posts do
    collection do
      get 'interest'
    end
  end

end
