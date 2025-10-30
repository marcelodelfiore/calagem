class CreateRecommendations < ActiveRecord::Migration[8.1]
  def change
    create_table :recommendations do |t|
      t.references :analysis, null: false, foreign_key: true
      t.references :culture, null: false, foreign_key: true
      t.float :level_Ca
      t.float :level_Mg

      t.timestamps
    end
  end
end
