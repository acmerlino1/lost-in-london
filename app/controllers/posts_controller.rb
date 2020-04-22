require './app/services/posts_for_branch_service'

class PostsController < ApplicationController

  before_action :redirect_if_not_signed_in, only: [:new]

  def show
    @post = Post.find(params[:id])
  end

  def interest
    post_for_branch(params[:action])
  end

  def new
    @categories = Category.all
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    @post.save
    redirect_to interest_posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :category_id)
  end

  def post_for_branch(branch)
    @categories = Category.where(branch: branch)
    @posts = get_posts.paginate(page: params[:page])
    respond_to do |format|
      format.html
      format.js { render partial: 'posts/posts_pagination_page' }
    end
  end

  def get_posts
    PostsForBranchService.new({
      search: params[:search],
      branch: params[:action],
      category: params[:category]
    }).call
  end

end
