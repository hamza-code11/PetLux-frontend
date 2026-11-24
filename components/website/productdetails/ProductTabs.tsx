"use client";

import { useState } from "react";
import { useCurrentUser } from "@/hooks/useAuth";
import { useSubmitReview } from "@/hooks/useShop";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { ProductReview } from "@/types/shop";
import styles from "./ProductTabs.module.css";
import Link from "next/link";

interface Props {
  description: string;
  features: string[];
  reviews?: ProductReview[];
  productSlug: string;
  isReviewsLoading?: boolean;
}

const RATING_LABELS: Record<number, string> = {
  1: "Bad",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

export default function ProductTabs({ description, features, reviews = [], productSlug, isReviewsLoading }: Props) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

  const { data: userData } = useCurrentUser();
  const user = userData?.user;
  const { toast } = useToast();
  const { mutate: submitReview, isPending } = useSubmitReview(productSlug);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to submit a review.");
      return;
    }

    submitReview(
      { rating: reviewForm.rating, comment: reviewForm.comment },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Review submitted successfully!");
          setReviewForm({ rating: 5, comment: "" });
          setHoverRating(0);
          setActiveTab("reviews");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to submit review.");
        },
      }
    );
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  // Hover ho to wo dikhao, warna selected rating
  const displayRating = hoverRating || reviewForm.rating;

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tabBtn} ${activeTab === "description" ? styles.active : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.active : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "write-review" ? styles.active : ""}`}
          onClick={() => setActiveTab("write-review")}
        >
          Write a Review
        </button>
      </div>

      <div className={styles.tabContent}>
        {/* 1. DESCRIPTION TAB - Sirf Long Description */}
        {activeTab === "description" && (
          <div className={styles.descriptionContent}>
            <p style={{ whiteSpace: "pre-line" }}>{description || "No description available."}</p>
          </div>
        )}

        {/* 2. REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className={styles.reviewsContent}>
            {isReviewsLoading ? (
              <p>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <div className={styles.emptyReviews}>
                <p>No reviews yet. Be the first to review this product!</p>
                <button
                  className={styles.writeReviewBtn}
                  onClick={() => setActiveTab("write-review")}
                >
                  Write a Review
                </button>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <strong>{review.user}</strong>
                    <div className={styles.reviewMeta}>
                      <span className={styles.reviewStars}>{renderStars(review.rating)}</span>
                      <span className={styles.reviewDate}>{review.date}</span>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* 3. WRITE REVIEW TAB */}
        {activeTab === "write-review" && (
          <div className={styles.writeReviewContent}>
            {!user ? (
              <div className={styles.loginPrompt}>
                <p>You need to be logged in to write a review.</p>
                <Link href="/login" className={styles.loginBtn}>
                  Login to Continue
                </Link>
              </div>
            ) : (
              <form className={styles.reviewForm} onSubmit={handleReviewSubmit}>
                <div className={styles.formGroup}>
                  <label id="rating-label">Rating</label>

                  <div className={styles.starRatingRow}>
                    <div
                      className={styles.starPicker}
                      role="radiogroup"
                      aria-labelledby="rating-label"
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <label
                          key={star}
                          className={`${styles.starLabel} ${star <= displayRating ? styles.starFilled : ""}`}
                          onMouseEnter={() => setHoverRating(star)}
                        >
                          <input
                            type="radio"
                            name="rating"
                            value={star}
                            className={styles.starInput}
                            checked={reviewForm.rating === star}
                            onChange={() => setReviewForm({ ...reviewForm, rating: star })}
                            aria-label={`${star} star${star > 1 ? "s" : ""} - ${RATING_LABELS[star]}`}
                          />
                          <svg
                            className={styles.starIcon}
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </label>
                      ))}
                    </div>

                    <span className={styles.ratingText}>
                      {displayRating} / 5 - {RATING_LABELS[displayRating]}
                    </span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Review</label>
                  <textarea
                    rows={5}
                    placeholder="Write your review here..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

