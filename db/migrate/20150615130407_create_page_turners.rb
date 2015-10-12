class CreatePageTurners < ActiveRecord::Migration
  def change
    create_table :page_turners do |t|
      t.string :batch_id
      t.string :cover
      t.string :template
      t.string :title
      t.text   :preamble

      t.timestamps
    end
  end
end
