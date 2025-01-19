<template>
  <div
      class="message"
      :class="isError ? 'message_error' : 'message_success'"
  >
    <div class="text">
      {{message}}
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  isError: {
    type: Boolean,
    default: false,
  }
})

</script>

<style scoped>

.message {
  border-radius: 12px;
  min-height: 20px;
  display: flex;
  align-items: center;
}

.message_success {
  background-color: #539836;
}

.message_error {
  background-color: #e3b642;
}

.text {
  color: #eaf0fc;
  margin: 16px;
  font-size: 16px;
}
</style>
