package controllers;

import dev.morphia.Datastore;
import dev.morphia.query.Query;
import models.User;

import java.util.List;
import java.util.Optional;

public class UserController {
    private Datastore datastore;

    public UserController(Datastore datastore) {
        this.datastore = datastore;
    }
    public Optional<User> getUser(String id) {
        Query<User> query = datastore.createQuery(User.class).field("id").equal(id);
        List<User> users = query.find().toList();
        if (users.size() == 0) {
            return Optional.empty();
        }
        return Optional.of(users.get(0));
    }

    public User createUser(String id, String email, String name) {
        User user = new User(id, email, name);
        datastore.save(user);
        return user;
    }
}
