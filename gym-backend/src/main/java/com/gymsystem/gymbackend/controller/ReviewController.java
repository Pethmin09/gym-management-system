package com.gymsystem.gymbackend.controller;

import com.gymsystem.gymbackend.entity.Review;
import com.gymsystem.gymbackend.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    // ENCAPSULATION: variable create to private & avoid to direct access
    //  RELATIONSHIP: ReviewController "Has-A" ReviewService
    private final ReviewService reviewService; // Has a Relationship

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    //HTTP GET Request to read all reviews
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }
    // HTTP Get Request to read the review,used to {/{id}}
    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Integer id) {
        return reviewService.getReviewById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }
    // HTTP post Request to create a new review
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }
    // HTTP PUT Request to update a review
    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Integer id, @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }
    // HTTP DELETE Request to delete a review
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return "Review deleted successfully";
    }
}