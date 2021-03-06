class SessionsController < ApplicationController

  def guest
    @user = User.new
    render :guest
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Username and/or Password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to root_url
  end
end
