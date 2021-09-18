<template>
  <div class="review-item">
    <div class="review-item-rating-container">
      <star-rating
        :star-size="15"
        :show-rating="false"
        inline
        read-only
        v-model="review.rating"
      ></star-rating>
      <div class="review-item-created">
        <span>·&nbsp;</span>
        {{ createdFromNow }}
      </div>
    </div>
    <h4 class="review-item-title">{{ review.title }}</h4>
    <div class="review-item-summary">{{ review.summary }}</div>
    <div class="review-item-recommends-container">
      <div class="review-item-author">{{ review.nickname }}</div>
      <div class="review-item-recommends-title">Recommends this product</div>
      <div class="review-item-recommends-yes" v-if="review.isRecommend">
        <check-icon />
      </div>
      <div class="review-item-recommends-no" v-else><close-icon /></div>
      <div class="review-item-recommends-yes-text" v-if="review.isRecommend">
        <span>Yes</span>
      </div>
      <div class="review-item-recommends-no-text" v-else>
        <span>No</span>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { duration } from "@/utils/datetime";
import CloseIcon from "vue-material-design-icons/Close.vue";
import CheckIcon from "vue-material-design-icons/Check.vue";

export default {
  components: {
    StarRating,
    CloseIcon,
    CheckIcon,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  computed: {
    createdFromNow() {
      return duration({ from: this.review.created_at });
    },
  },
};
</script>

<style scoped>
.review-item {
  margin-bottom: 2em;
}

.review-item-title {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.review-item-rating-container {
  display: flex;
  align-items: center;
}

.review-item-created {
  color: #bbb;
  font-size: 12px;
}
.review-item-recommends-container {
  display: flex;
  align-items: center;
}
.review-item-recommends-title {
  font-weight: bold;
  margin-right: 0.5em;
}

.review-item-summary {
  text-align: justify;
}

.review-item-title {
  text-align: left;
}

.review-item-author {
  text-align: left;
  color: blue;
  margin-right: 0.5em;
}
</style>