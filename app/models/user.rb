class User < ApplicationRecord
  has_many :sites, dependent: :destroy

  def self.from_omniauth(auth)
    find_by_provider_and_uid(auth["provider"], auth["uid"]) || create_with_omniauth(auth)
  end

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.image_url = auth['info']['image']
      user.url = auth['info']['urls'][user.provider.capitalize]
      user.save!
      user
    end
  end
end
