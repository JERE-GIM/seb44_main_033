package com.cinemaprincess.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.cinemaprincess.audit.Auditable;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.watchlist.entity.Watchlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;
import org.hibernate.annotations.BatchSize;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer age;

    @Column(nullable = false, unique = true)
    private String username;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> genre = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> roles = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @BatchSize(size = 10)
    private Watchlist watchlist;

    private String provider;

    private String profileImgName;

    private String profileImgPath;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Review> reviews;

    public User(String email, String password, String username, List<String> roles, String provider) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.roles = roles;
        this.provider = provider;
    }

    public enum Gender {
        MALE, FEMALE;
    }
}
