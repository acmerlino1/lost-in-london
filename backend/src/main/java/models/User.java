package models;

import dev.morphia.annotations.Entity;
import dev.morphia.annotations.Id;

@Entity
public class User {
    @Id
    private String id;
    private String email;
    private String name;

    public User(String id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public User() {}
}
