<template>
  <div class="reviewform-container">
    <div
      role="alert"
      class="message-box message-box__success"
      v-if="isSubmitted"
    >
      Your review was submitted succesful!
    </div>

    <form v-else class="reviewform-form" :action="action" method="POST">
      <div
        role="alert"
        class="message-box message-box__error"
        v-if="isSubmitError"
      >
        {{ errorMessage }}
      </div>

      <input-field
        type="email"
        :required="true"
        label="Email"
        v-model="email"
        id="reviewform-email"
        placeholder="add email"
      />

      <input-field
        type="text"
        :required="true"
        label="Nickname"
        v-model="nickname"
        id="reviewform-nickname"
        placeholder="add nickname"
      />

      <div class="formfield__wrapper formfield__wrapper--align-center">
        <div class="formfield__label-wrapper">
          <label class="formfield__label">Rating</label>
        </div>

        <div class="formfield__input-wrapper">
          <star-rating
            class="reviewform-rating"
            inline
            v-model="rating"
          ></star-rating>
        </div>
      </div>

      <input-field
        :required="true"
        label="Title"
        v-model="title"
        id="reviewform-title"
        placeholder="add title"
      />

      <textarea-field
        :required="true"
        label="Summary"
        id="reviewform-summary"
        v-model="summary"
      />

      <checkbox-field
        id="reviewform-checkbox"
        v-model="isRecommend"
        label="I can recommend this product"
      />

      <div class="formfield__wrapper formfield__wrapper--justify-end">
        <div class="reviewform__submit-wrapper">
          <button
            class="button button__submit"
            :disabled="isSubmitDisabled"
            @click.prevent="submitReview"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { review_service_url, addReview } from "@/assets/js/easyreview";
import StarRating from "vue-star-rating";
import InputField from "./InputField.vue";
import CheckboxField from "./CheckboxField.vue";
import TextareaField from "./TextareaField.vue";

export default {
  components: {
    StarRating,
    InputField,
    CheckboxField,
    TextareaField,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rating: 0,
      title: "",
      summary: "",
      nickname: "",
      isRecommend: false,
      email: "",
      action: review_service_url,
      isSubmitted: false,
      isSubmitError: false,
    };
  },
  computed: {
    isSubmitDisabled() {
      return (
        !this.title ||
        !this.summary ||
        !this.email ||
        !this.rating ||
        !this.nickname
      );
    },
  },
  methods: {
    submitReview() {
      this.clearFormErrors();

      addReview({
        rating: this.rating,
        title: this.title,
        summary: this.summary,
        isRecommend: this.isRecommend,
        email: this.email,
        nickname: this.nickname,
        productId: this.productId,
      })
        .then(() => {
          this.isSubmitted = true;

          setTimeout(() => {
            this.$parent.close();
          }, 3000);
        })
        .catch((data) => {
          this.showFormErrors(data);
        });
    },

    showFormErrors(data) {
      this.isSubmitError = true;

      if (data.message) {
        this.errorMessage = data.message;
      } else {
        this.errorMessage =
          "There was an error trying to submit your review. Please try again later.";
      }
    },

    clearFormErrors() {
      this.isSubmitError = false;
      this.errorMessage = null;
    },
  },
};
</script>

<style scoped>
.reviewform-form {
  background: #eee;
  padding: 1.2em;
}

.reviewform-rating {
  float: left;
}

.reviewform__submit-wrapper {
  width: 75%;
}
</style>