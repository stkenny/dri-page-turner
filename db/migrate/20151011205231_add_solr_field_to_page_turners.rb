class AddSolrFieldToPageTurners < ActiveRecord::Migration
  def change
    add_column :page_turners, :solr_field, :string
  end
end
