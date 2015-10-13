class BooksController < ApplicationController

  def index
  end

  def show
    @page_turner = PageTurner.find(params[:id])
  end
end
