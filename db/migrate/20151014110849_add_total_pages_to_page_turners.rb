class AddTotalPagesToPageTurners < ActiveRecord::Migration
  def change
    add_column :page_turners, :total_pages, :integer
  end
end
