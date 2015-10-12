class AddPageFilenameToPageTurners < ActiveRecord::Migration
  def change
    add_column :page_turners, :page_filename, :string
  end
end
