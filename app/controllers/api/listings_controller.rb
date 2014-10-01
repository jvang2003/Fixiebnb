module Api
  class ListingsController < ApplicationController

    def new
      @listing = Listing.new
      render json: @listing
    end

    def current_user_listings
      if current_user && current_user.listings
        @listings = current_user.listings.includes(:images, :requests)
      end
      render :index
    end

    def index
      if params["bounds"]
        @listings = Listing.includes(:images).where(
        "latitude >= ? AND latitude <= ?
        AND
        longitude >= ? AND longitude <= ?",
        params["bounds"]["bottom_left_lat"],
        params["bounds"]["top_right_lat"],
        params["bounds"]["bottom_left_long"],
        params["bounds"]["top_right_long"])
      else
        @listings = Listing.includes(:images).all
      end

      render :index
    end

    def show
      @listing = Listing.find(params[:id])
      @images = @listing.images
      @owner = @listing.owner
      render :show
    end

    def create
      @listing = current_user.listings.new(listing_params)

      if @listing.save
        render json: @listing
      else
        render json: @listing.errors.full_messages, status: :unprocessable_entity
      end
    end

    def edit
      @listing = Listing.find(params[:id])
      render json: @listing
    end

    def update
      @listing = current_user.listings.find(params[:id])

      if @listing.update_attributes(listing_params)
        render json: @listing
      else
        render json: @listing.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @listing = current_user.listings.find(params[:id])
      @listing.destroy
      render json: {}
    end

    private

    def listing_params
      params.require(:listing).permit(
        :user_id,
        :list_title,
        :list_desc,
        :price,
        :lat,
        :long,
        :street,
        :city,
        :state,
        :zip,
        :deposit
      )
    end
  end
end
