class InterestsController < ApplicationController
  def index
    @interests = Interest.all
  end
  def show
    @interest = Interest.find(params[:id])
  end

  def new
  end

  def create
    @interest = Interest.new(interest_params)

    @interest.save
    redirect_to @interest
  end

  private
  def interest_params
    params.require(:interest).permit(:name, :email, :experince)
  end
end
