package com.cinemaprincess.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.OneToOne;

//import com.cinemaprincess.Image.entity.Image;
import com.cinemaprincess.audit.Auditable;
import com.cinemaprincess.watchlist.entity.Watchlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

//    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

//    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false, unique = true)
    private String username;

    @ElementCollection()
    @Column(name = "genreId")
    private List<Long> genre = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Watchlist watchlist;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
//    private Image image;

    public User(String email, String password, String username, List<String> roles) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.roles = roles;
    }

    public enum Gender {
        MALE, FEMALE;
    }
}
