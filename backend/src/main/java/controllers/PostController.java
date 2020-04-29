package controllers;

import dev.morphia.Datastore;
import dev.morphia.query.Query;
import models.Post;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

public class PostController {
    private Datastore datastore;

    public PostController(Datastore datastore) { this.datastore = datastore; }
    public List<Post> getAllPosts() {
        Query<Post> query = datastore.createQuery(Post.class);
        List<Post> posts = query.find().toList();
        return posts;
    }

    public Post createPost(String userId, String userName, String title, String description, String category, LocalDateTime created_at) {
        Post post = new Post(userId, userName, title, description, category, created_at);
        datastore.save(post);
        return post;
    }


//    public Optional<Post> getPost(String id) {
//        Query<Post> query = datastore.createQuery(Post.class).field("id").equal(id);
//        List<Post> posts = query.find().toList();
//        if (posts.size() == 0) {
//            return Optional.empty();
//        }
//        return Optional.of(posts.get(0));
//    }
}
