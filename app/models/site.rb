class Site < ApplicationRecord
  belongs_to :user

  has_many :pages, dependent: :destroy, :inverse_of => :site
  has_many :comments, as: :commentable
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  validates :name, presence: true
  accepts_nested_attributes_for :pages

  searchable do
    text :name
    text :pages do
      pages.map { |page| page.body }
    end
    text :comments do
      comments.map { |comment| comment.body }
    end
    text :tags do
      tags.map { |tag| tag.name }
    end

    integer :user_id
  end

  def self.tagged_with(name)
    Tag.find_by_name!(name).sites
  end

  def self.tag_counts
    Tag.select("tags.*, count(taggings.tag_id) as count").
      joins(:taggings).group("taggings.tag_id")
  end

  def tag_list
    tags.map(&:name).join(", ")
  end

  def tag_list=(names)
    self.tags = names.split(",").map do |n|
      Tag.where(name: n.strip).first_or_create!
    end
  end

end
