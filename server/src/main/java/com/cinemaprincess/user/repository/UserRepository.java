package com.cinemaprincess.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemaprincess.user.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByUserId(Long userId);
    @Query("SELECT u FROM User u WHERE u.gender = :genderEnum AND u.age >= :minAge AND u.age <= :maxAge")
    List<User> findByAgeRangeAndGender(@Param("genderEnum") User.Gender gender,
                                       @Param("minAge") int minAge,
                                       @Param("maxAge") int maxAge);
}
