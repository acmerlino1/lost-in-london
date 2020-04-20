class PostsController < ApplicationController

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
    branch: params[:action],
    search: params[:search],
    category: params[:category]
   }).call
  end

end
