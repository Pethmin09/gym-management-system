package com.gymsystem.gymbackend.service;

import com.gymsystem.gymbackend.entity.Review;
import com.gymsystem.gymbackend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    // ENCAPSULATION & RELATIONSHIP: ReviewService "Has-A" ReviewRepository (Private field)
    private final ReviewRepository reviewRepository;

    // DEPENDENCY INJECTION
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Integer id) {
        return reviewRepository.findById(id);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Integer id, Review updatedReview) {
        return reviewRepository.findById(id)
                .map(existingReview -> {
                    // ENCAPSULATION: Entity data is not changed but Getters & Setters used to changed
                    existingReview.setMemberName(updatedReview.getMemberName());
                    existingReview.setRating(updatedReview.getRating());
                    existingReview.setComment(updatedReview.getComment());
                    existingReview.setReviewDate(updatedReview.getReviewDate());

                    return reviewRepository.save(existingReview);
                })
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }

    public void deleteReview(Integer id) {
        reviewRepository.deleteById(id);
    }
}