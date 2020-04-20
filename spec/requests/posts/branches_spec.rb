require 'rails_helper'
include Warden::Test::Helpers

RSpec.describe "branches", :type => :request do
  
  it 'renders an interest template' do
    get '/posts/interest'
    expect(response).to render_template(:interest)
  end
  
end