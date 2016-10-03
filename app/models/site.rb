class Site < ApplicationRecord
  belongs_to :user
  has_many :pages, dependent: :destroy, :inverse_of => :site
  has_many :comments, as: :commentable
  has_many :taggings
  has_many :tags, through: :taggings

  accepts_nested_attributes_for :pages

  # Site.include_root_in_json = true

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
    # str = names.join(",")
    self.tags = names.split(",").map do |n|
      Tag.where(name: n.strip).first_or_create!
    end
  end

  # def as_json(options = {})
  #   super(options.merge(include: [:user, :tags, :pages]))
  # end

end
