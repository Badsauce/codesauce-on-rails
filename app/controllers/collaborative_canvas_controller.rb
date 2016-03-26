class CollaborativeCanvasController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  #GET collaborative_canvas/history
  def history
    @history = History.find(1)
    render :json => @history
  end

  #POST collaborative_canvas/history
  def add_history
    @history = History.find(params['id'])
    @history.history = params['history']

    @response = Hash["status" => 'Failed']

    if @history.save
      @response['status'] = 'Success'
    end

    render :json => @response
  end
end
