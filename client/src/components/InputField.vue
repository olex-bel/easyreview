<template>
  <div class="formfield__wrapper formfield__wrapper--align-center">
    <div v-if="label" class="formfield__label-wrapper">
      <label class="formfield__label" :for="id">{{ label }}</label>
    </div>

    <div class="formfield__input-wrapper">
      <input
        :type="type"
        :id="id"
        class="formfield__input"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue"
        :required="required ? true : null"
      />
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
    error: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "email", "number"].includes(value);
      },
    },
  },

  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
