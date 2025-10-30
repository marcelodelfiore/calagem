class CreateAnalyses < ActiveRecord::Migration[8.1]
  def change
    create_table :analyses do |t|
      t.references :user, null: false, foreign_key: true
      t.float :T
      t.float :v1
      t.float :v2
      t.float :K
      t.float :Mg
      t.float :Ca

      t.timestamps
    end
  end
end
