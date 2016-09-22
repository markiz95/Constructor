class User < ApplicationRecord
  # class << self
  #   def from_omniauth(auth_hash)
  #     user = find_or_create_by(uid: auth_hash['uid'], provider: auth_hash['provider'])
  #         user.name = auth_hash['info']['name']
  #         user.location = auth_hash['info']['location']
  #         user.image_url = auth_hash['info']['image']
  #         user.url = auth_hash['info']['urls'][user.provider.capitalize]
  #         user.save!
  #         user
  #   end
  # end
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
