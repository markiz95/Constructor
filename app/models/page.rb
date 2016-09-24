class Page < ApplicationRecord
  belongs_to :site
  has_many :comments, as: commentable
end
