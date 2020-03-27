package dev.codesquad.java.signup12;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;

public class User {
    @Id
    Long id;
    String userId;
    String password;
    String name;
    String birthDate;
    String gender;
    String email;
    String phone;
    String interest;
    LocalDate createdDate;

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public String getGender() {
        return gender;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getInterest() {
        return interest;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public boolean isRegisteredUserId(String userId) {
        if (userId == null) {
            return false;
        }
        return userId.equals(this.userId);
    }

    public boolean isPasswordEquals(String password) {
        if (password == null) {
            return false;
        }
        return password.equals(this.password);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", gender='" + gender + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", interest='" + interest + '\'' +
                ", createdDate=" + createdDate +
                '}';
    }
}
