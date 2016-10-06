class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  def as_json(options = {})
    super(options.merge(include: :user))
  end  
end
