class Recommendation < ApplicationRecord
  belongs_to :analysis
  belongs_to :culture
end
