//package com.cinemaprincess.Image.entity;
//
//import javax.persistence.Entity;
//import javax.persistence.Id;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Column;
//import javax.persistence.OneToOne;
//import javax.persistence.FetchType;
//import javax.persistence.JoinColumn;
//
//import com.cinemaprincess.user.entity.User;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.Builder;
//
//@Getter
//@Setter
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//public class Image {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long imageId;
//
//    @Column(nullable = false)
//    private String url;
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "userId")
//    private User user;
//
//    public void updateUrl(String url) {
//        this.url = url;
//    }
//}
