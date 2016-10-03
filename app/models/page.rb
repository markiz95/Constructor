class Page < ApplicationRecord
  belongs_to :site, :inverse_of => :pages
  has_many :comments, as: :commentable
end
