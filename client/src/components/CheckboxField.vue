<template>
  <div class="formfield__wrapper formfield__wrapper--justify-end">
    <div class="formfield__input-wrapper">
      <label class="formfield__label" :for="id">
        <input
          :id="id"
          type="checkbox"
          class="formfield__checkbox"
          :checked="!!value"
          @change="updateValue"
        />

        {{ label }}
      </label>
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
      type: Boolean,
    },
    label: {
      type: String,
      required: true,
    },
  },

  methods: {
    updateValue(event) {
      this.$emit("input", event.target.checked);
    },
  },
};
</script>