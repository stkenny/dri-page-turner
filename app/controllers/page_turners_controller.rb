class PageTurnersController < ApplicationController

  def new
   @page_turner = PageTurner.new
  end

  def index
    @page_turners = PageTurner.all
  end

  def edit
    @page_turner = PageTurner.find(params[:id])
  end

  def create
    if params[:page_turner][:preamble]
      params[:page_turner][:preamble] = params[:page_turner][:preamble].split(',')
    end

    @page_turner = PageTurner.new(page_turner_params)
 
    if @page_turner.save
      redirect_to @page_turner
    else
      render 'new'
    end
  end
 
  def update
    @page_turner = PageTurner.find(params[:id])

    if params[:page_turner][:preamble]
      params[:page_turner][:preamble] = params[:page_turner][:preamble].split(',')
    end
 
    if @page_turner.update(page_turner_params)
      redirect_to @page_turner
    else
      render 'edit'
    end
  end

  def show
    @page_turner = PageTurner.find(params[:id])
  end

  def page
    book_id = params[:book_id]
    page = params[:id]

    url = nil

    turner = PageTurner.find(book_id)
    url = turner.page_url(page) if turner

    render text: "<div><img src='#{url}'/></div>"
  end

  private

  def page_turner_params
    params[:page_turner][:preamble] ||= []
    params.require(:page_turner).permit(:batch_id, :cover, :template, :title, :solr_field, :page_filename, preamble: [])
  end
end
