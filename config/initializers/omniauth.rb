Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, 'uZQ6svJO8DUDn4lv3yEMLY7EX', 'ZtfLEEg12mUUHHMcDU3T1hgwiqWlTMMZ7LuM67MxSMuuKOxfVI'
  provider :vkontakte, '5617829', 'MZNJWOsS3pAlku6sFWTs',
  {
      :scope => 'friends,audio,photos',
      :display => 'popup',
      :lang => 'en',
      :https => 1,
      :image_size => 'mini',
      :redirect_url => 'http://localhost:3000/auth/vkontakte/callback'
      # https://shrouded-wave-77742.herokuapp.com/auth/vkontakte/callback
  }
  provider :facebook, '153356695109014', '4bd7acd3fb51837e3e8e82c002841e8e',
           scope: 'public_profile', info_fields: 'id,name,link'
           #  152904908487526 d3b1786f5cf47bcc726b5739a6edc91d
           # test 153356695109014 4bd7acd3fb51837e3e8e82c002841e8e
end
