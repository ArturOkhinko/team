<template>
  <div class="shortener_container">
    <shortener-form
        @set-url="setShortenedUrl"
    />
    <shortened-url
        v-if="shortUrl"
        :url="shortUrl"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ShortenerForm from "@/components/ShortenerForm.vue";
import ShortenedUrl from "@/components/ShortenedUrl.vue";

const shortUrl = ref('')

function setShortenedUrl(newShortenedUrl) {
  shortUrl.value = newShortenedUrl
}
</script>

<style scoped>

.shortener_container {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}
</style>
