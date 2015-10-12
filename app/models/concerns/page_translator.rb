module PageTranslator
  extend ActiveSupport::Concern

  def translate_page_id(page_id, solr_field)
    client.page_to_object_id(page_id, solr_field)
  end
end
