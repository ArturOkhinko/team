<template>
  <div class="shortened_url">
    <div class="shortened_url__url">
      {{ url }}
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  url: {
    type: String,
    required: true,
  }
})

</script>

<style scoped>

.shortened_url {
  border-radius: 14px;
  background-color: white;
  width: 600px;
}

.shortened_url__url {
  font-size: 20px;
  color: #2f3747;
  margin: 16px;
}
</style>
