<template>
  <div class="pdp">
    <main></main>
    <div class="pdp-sections">
      <section class="reviews">
        <ReviewList :productId="pid" />
      </section>
    </div>
  </div>
</template>

<script>
import ReviewList from "../components/ReviewList";

export default {
  components: {
    ReviewList,
  },
  props: {
    pid: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.pdp-sections {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reviews {
  width: 80%;
}
</style>