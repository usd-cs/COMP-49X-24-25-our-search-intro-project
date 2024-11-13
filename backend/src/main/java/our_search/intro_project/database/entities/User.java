package our_search.intro_project.database.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    private Boolean admin;

    @Column(nullable = false, length = 255)
    private String password;

    public User() {

    }

    public User(String email, String name, Boolean admin, String password) {
        this.email = email;
        this.name = name;
        this.admin = admin;
        this.password = password;
    }

    // Getters and Setters
    public Integer getUserId() {
        return id;
    }

    public void setUserId(Integer userId) {
        this.id = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}


