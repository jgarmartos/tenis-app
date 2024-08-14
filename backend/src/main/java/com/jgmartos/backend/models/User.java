package com.jgmartos.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "users")
public class User {

    @Id
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name= "avatar")
    private String avatar;

    @Column(name = "user")
    private Integer user;

    public User() {}

    public User(String email, String password, String avatar, Integer user) {
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.user = user;
    }   

}
