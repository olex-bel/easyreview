<template>
  <div class="formfield__wrapper">
    <div v-if="label" class="formfield__label-wrapper">
      <label class="formfield__label" :for="id">{{ label }}</label>
    </div>

    <div class="formfield__input-wrapper">
      <textarea
        :id="id"
        class="formfield__textarea"
        :value="value"
        @input="updateValue"
        :rows="rows"
        :required="required ? true : null"
      ></textarea>
    </div>

    <div role="alert" aria-atomic="true" class="formfield__error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    rows: {
      type: Number,
      default: 5,
    },
    error: {
      type: String,
    },
    required: {
      type: Boolean,
    },
  },

  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>