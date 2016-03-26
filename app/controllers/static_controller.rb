class StaticController < ApplicationController

  def index

  end

  def ecommerce_index

  end

  def ecommerce_lab_1

  end

  def ecommerce_lab_2
    @is_valid = true
    @email_is_valid = true
    @form_data = params
    @missing_required_fields = []

    if params[:name] == nil or params[:name] == ""
      @missing_required_fields.push("Name")
      @is_valid = false
    end

    if params[:email] == nil or params[:email] == ""
      @missing_required_fields.push("Email")
      @is_valid = false
    elsif /@/.match(params[:email]) == nil
      @email_is_valid = false
      @is_valid = false
    end


    if params[:interest] == nil
      @missing_required_fields.push("Level of interest")
      @is_valid = false
    end

  end

  def ecommerce_lab_3

  end

end
