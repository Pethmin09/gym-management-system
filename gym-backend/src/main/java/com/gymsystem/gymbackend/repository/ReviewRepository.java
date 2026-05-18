package com.gymsystem.gymbackend.repository;

import com.gymsystem.gymbackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// Spring to interface give a  implementation
public interface ReviewRepository extends JpaRepository<Review, Integer> {
}