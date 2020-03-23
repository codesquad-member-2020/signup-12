package dev.codesquad.java.signup12;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;

public class User {
    @Id
    Long id;
    String userid;
    String password;
    String email;
    String name;
    LocalDate createdDate;

    public Long getId() {
        return id;
    }

    public String getUserid() {
        return userid;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userId='" + userid + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", createdDate=" + createdDate +
                '}';
    }
}
