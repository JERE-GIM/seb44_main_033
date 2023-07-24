package com.cinemaprincess.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemaprincess.user.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    User findByUserId(Long userId);
    User findUserByEmail(String email);
    @EntityGraph(attributePaths = { "watchlist", "genre" })
    @Query("SELECT DISTINCT u FROM User u " +
            "WHERE u.gender = :genderEnum " +
            "AND u.age >= :minAge " +
            "AND u.age <= :maxAge")
    List<User> findByAgeRangeAndGender(@Param("genderEnum") User.Gender gender,
                                       @Param("minAge") int minAge,
                                       @Param("maxAge") int maxAge);

}
