require 'rails_helper'
require './app/services/posts_for_branch_service'

RSpec.describe PostsForBranchService do

  context '#call' do
    let(:not_included_posts) { create_list(:post, 2) }
    let(:category) { create(:category, branch: 'interest', name: 'arts') }
    let(:post) do
      create(:post,
              title: 'a very fun post',
            category_id: category.id)
    end

    it 'returns posts filtered by a branch' do
      not_included_posts
      category
      included_posts = create_list(:post, 2, category_id: category.id)
      expect(PostsForBranchService.new({branch: 'interest'}).call).to(
        match_array included_posts
      )
    end

    it 'returns posts filtered by a category name' do
      not_included_posts
      category
      included_post = [] << post
      expect(PostsForBranchService.new({branch: 'interest', category: 'arts'}).call).to(
        eq included_post
      )
    end

    it 'returns posts filteres by a category name and a search input' do
      not_included_posts
      category
      included_post = [] << post
      expect(PostsForBranchService.new({name: 'arts', 
                                        search: 'fun', 
                                        branch: 'interest'}).call).to(
                                        eq included_post)
    end
  end
end