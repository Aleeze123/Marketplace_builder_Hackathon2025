"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaTrash, FaPaperPlane } from "react-icons/fa";

interface Review {
  name: string;
  rating: number;
  reviewText: string;
}

const ReviewSection = ({ reviewId }: { reviewId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    name: "",
    rating: 0,
    reviewText: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);

  // Default reviews to display
  const defaultReviews: Review[] = [
    {
      name: "Aleeza",
      rating: 5,
      reviewText: "Great product! Highly recommend it.",
    },
    {
      name: "Hania",
      rating: 4,
      reviewText: "Absolutely loved it, exceeded my expectations!",
    },
  ];
  useEffect(() => {
    const storedReviews = localStorage.getItem(`reviews-${reviewId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(defaultReviews);
    }
  }, [reviewId]);
  useEffect(() => {
    if (reviews.length > 0 && reviews[0] !== defaultReviews[0]) {
      localStorage.setItem(`reviews-${reviewId}`, JSON.stringify(reviews));
    }
  }, [reviews, reviewId]);
  const addReview = () => {
    if (newReview.name.trim() && newReview.rating > 0 && newReview.reviewText.trim()) {
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setNewReview({ name: "", rating: 0, reviewText: "" }); 
      setShowThankYou(true); // thank You message
      setTimeout(() => setShowThankYou(false), 3000); 
    } else {
      alert("Please fill in all fields and select a rating!");
    }
  };
  const removeReview = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${reviewId}`, JSON.stringify(updatedReviews));
  };

  return (
    <div className="text-black min-h-screen flex flex-col items-center p-6">
      {showThankYou && (
        <div className="w-full max-w-md text-center p-4 mb-4 bg-green-500 text-white rounded">
          Thank you for your review!
        </div>
      )}
      <div className="w-full max-w-md mt-6 space-y-4">
        {reviews.length > 0 && reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200 flex justify-between items-start"
          >
            <div className="flex flex-col">
              <h3 className="font-semibold">{review.name}</h3>
              <div className="flex text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="mt-2">{review.reviewText}</p>
            </div>
           
          </div>
        ))}
      </div>
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="text-lg">Rating:</div>
          <div className="flex space-x-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`cursor-pointer ${
                  newReview.rating > i ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              />
            ))}
          </div>
        </div>
        <textarea
          placeholder="Your Review"
          value={newReview.reviewText}
          onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          rows={3}
        />
        <button
          onClick={addReview}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center space-x-2"
        >
          <span>Send</span>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
