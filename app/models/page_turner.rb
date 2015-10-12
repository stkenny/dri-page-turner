class PageTurner < ActiveRecord::Base
  include PageTranslator

  serialize :preamble, Array

  def client
    @client ||= DriClient.new
  end

  def page_url(page)
    page = page.to_i
  
    return cover_url if page == 1
    return preamble_urls[page - 2] if (page > 1 && page <= self.preamble.size + 1)  
     
    page = page - offset
    page_id = self.template % page

    object_id = translate_page_id(page_id, self.solr_field)

    url = client.page_url(object_id, self.page_filename) if object_id
    puts url
    url
  end

  private

    def cover_url
      url = client.page_url(self.cover, self.page_filename)
      puts url
      url
    end

    def preamble_urls
      urls = []
      self.preamble.each do |p|
        urls << client.page_url(p, self.page_filename)
      end

      puts urls
      urls
    end
    
    def offset
      1 + self.preamble.size
    end
end
