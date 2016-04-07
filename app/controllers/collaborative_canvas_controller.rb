class CollaborativeCanvasController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  #GET collaborative_canvas/history/:id
  def history
    @history = History.find(params['id'])
    render :json => @history
  end

  #POST collaborative_canvas/clear_history
  def clear_history
    @history = History.find(params['id'])
    @history.history = []
    @history.save
    @response = Hash["status" => 'History Cleared']
    render :json => @response
  end

  #POST collaborative_canvas/history/
  def add_history
    @history = History.find(params['id'])
    if @history.history
      @history.history += params['history']
    else
      @history.history = params['history']
    end

    @response = Hash["status" => 'Failed']

    if @history.save
      @response['status'] = 'Success'
    end

    render :json => @response
  end
end
