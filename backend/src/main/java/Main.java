import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.MongoCommandException;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import controllers.PostController;
import controllers.UserController;
import dev.morphia.Datastore;
import dev.morphia.Morphia;
import models.Post;
import models.User;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


import static spark.Spark.*;


public class Main {
    private static void setupRoutes(UserController userController, PostController postController) {
        exception(Exception.class, (exception, request, response) -> {
            System.out.println(exception);
        });
        Gson gson = new Gson();
        get("/hello", (req, res) -> "Hello World");
        path("/users", () -> {
            post("", (req, res) -> {
                // Authorization -> "Bearer <token>"
                String authHeader = req.headers("Authorization");
                String[] parts = authHeader.split(" ");
                if (parts.length != 2 || !parts[0].equals("Bearer")) {
                    res.status(401);
                    return "Unauthorized";
                }

                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(parts[1]);
                String uid = decodedToken.getUid();
                System.out.println(uid);
                try {
                    Optional<User> user = userController.getUser(uid);
                    if (user.isPresent()) {
                        return user;
                    }

                    User createdUser = userController.createUser(uid, decodedToken.getEmail(), decodedToken.getName());
                    return createdUser;
                } catch (Exception e) {
                    System.out.println(e);
                }
                return "";

            }, gson::toJson);
        });



        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        path("/posts", () -> {
            get("", (req, res) -> {
                // Authorization -> "Bearer <token>"
                String authHeader = req.headers("Authorization");
                String[] parts = authHeader.split(" ");
                if (parts.length != 2 || !parts[0].equals("Bearer")) {
                    res.status(401);
                    return "Unauthorized";
                }

                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(parts[1]);
                String uid = decodedToken.getUid();
                System.out.println(uid);
                Optional<User> user = userController.getUser(uid);
                if (user.isPresent()) {
                    List<Post> posts = postController.getAllPosts();
                    return posts;
                }
                return "";

            }, gson::toJson);
            post("", (req, res) -> {
                // Authorization -> "Bearer <token>"
                String authHeader = req.headers("Authorization");
                String[] parts = authHeader.split(" ");
                if (parts.length != 2 || !parts[0].equals("Bearer")) {
                    res.status(401);
                    return "Unauthorized";
                }

                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(parts[1]);
                String uid = decodedToken.getUid();
                System.out.println(uid);
                Optional<User> user = userController.getUser(uid);
                if (user.isPresent()) {
                    Post reqBody = gson.fromJson(req.body(), Post.class);
                    Post post = postController.createPost(uid, decodedToken.getName(), reqBody.getTitle(), reqBody.getDescription(), reqBody.getCategory(), LocalDateTime.now());
                    return post;
                }
                return "";

            }, gson::toJson);
        });

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request
                    .headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request
                    .headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods",
                        accessControlRequestMethod);
            }
            return "OK";
        });

    }

    private static Datastore setupMongo() {
        MongoClient mongo = new MongoClient();
        MongoDatabase database = mongo.getDatabase("lost-in-london");
        try {
            database.createCollection("users");
        } catch (MongoCommandException e) {
            System.out.println("Tables already exist.");
        }

        for (String s : database.listCollectionNames()) {
            System.out.println(s);
        }

        Morphia morphia = new Morphia();
        morphia.mapPackage("models");
        Datastore datastore = morphia.createDatastore(mongo, "lost-in-london");
        datastore.ensureIndexes();
        return datastore;
    }

    private static void setupFirebase() throws IOException {
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.getApplicationDefault())
                .build();

        FirebaseApp.initializeApp(options);
    }

    public static void main(String[] args) throws IOException {
        setupFirebase();
        Datastore datastore = setupMongo();
        UserController userController = new UserController(datastore);
        PostController postController = new PostController(datastore);
        setupRoutes(userController, postController);
    }
}
