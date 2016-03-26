Rails.application.routes.draw do
  get 'collaborative_canvas/index'
  get 'collaborative_canvas/history'
  post 'collaborative_canvas/history', to: 'collaborative_canvas#add_history'

  resources :interests
  #resources :tasks
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'static#index'
  get '/ecommerce', to: 'static#ecommerce_index'
  get '/ecommerce/lab1', to: 'static#ecommerce_lab_1'
  get '/ecommerce/lab2', to: 'static#ecommerce_lab_2'
  post '/ecommerce/lab2', to: 'static#ecommerce_lab_2'
  get '/ecommerce/lab3', to: 'static#ecommerce_lab_3'
  get '/ecommerce/case_study', to: 'static#ecommerce_case_study'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
