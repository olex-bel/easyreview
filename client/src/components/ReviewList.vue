<template>
  <div>
    <div v-if="!isReviewsListEmpty">
      <header class="reviews-actions">
        <h2 class="reviews-actions-header">Reviews</h2>
        <div class="reviews-actions-container">
          <button class="button reviews-actions-write" @click="openModal()">
            Write review
          </button>
        </div>
      </header>
      <section class="reviews-list">
        <div v-for="review in reviews" v-bind:key="review._id">
          <ReviewItem :review="review" />
        </div>
        <button class="button" v-if="hasMoreReviews" @click="loadReviews">
          Load more reviews
        </button>
      </section>
    </div>
    <div v-else>
      <button class="button" @click="openModal()">
        Be the first to review this product
      </button>
    </div>

    <modal v-if="showWriteReviewModal" v-on:modal-close="closeModal">
      <ReviewForm :productId="productId" />
    </modal>
  </div>
</template>

<script>
import ReviewItem from "./ReviewItem.vue";
import ReviewForm from "./ReviewForm.vue";
import { getAllReviews } from "@/assets/js/easyreview";
import Modal from "./Modal.vue";

export default {
  name: "ReviewList",
  components: {
    ReviewItem,
    ReviewForm,
    Modal,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      skip: 0,
      limit: 10,
      hasMoreReviews: false,
      showWriteReviewModal: false,
    };
  },
  computed: {
    isReviewsListEmpty() {
      return !this.reviews || this.reviews.length === 0;
    },
  },
  methods: {
    loadReviews() {
      getAllReviews({
        productId: this.productId,
        skip: this.skip,
        limit: this.limit,
      })
        .then((response) => {
          const { reviews, pagination } = response;

          this.updatePaginationData(pagination);
          this.addReviewsToList(reviews);
        })
        .catch(() => {
          console.log("Cannot get reviews from server.");
        });
    },

    addReviewsToList(reviews) {
      for (let i = 0; i < reviews.length; ++i) {
        this.reviews.push(reviews[i]);
      }
    },

    updatePaginationData({ skip, limit, hasMoreReviews }) {
      this.skip = skip;
      this.limit = limit;
      this.hasMoreReviews = hasMoreReviews;
    },

    openModal() {
      this.showWriteReviewModal = true;
    },

    closeModal() {
      this.showWriteReviewModal = false;
    },
  },
  created() {
    this.loadReviews();
  },
};
</script>

<style scoped>
.reviews-actions {
  display: flex;
  justify-content: space-between;
}
</style>