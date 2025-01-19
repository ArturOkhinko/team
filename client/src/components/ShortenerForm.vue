<template>
  <div class="shortener_form">
    <div class="shortener_form__inputs">
      <input
          class="input"
          placeholder="Введите ссылку, которую нужно сократить"
          v-model="originalUrl"
      />
    </div>
    <button
        class="button"
        @click="shortenUrl"
    >
      Сократить
    </button>
  </div>

  <message
      v-if="messageText"
      :message="messageText"
      is-error
  />
</template>

<script setup>
import {ref} from "vue";
import ShortenerUrlService from "@/services/ShortenerUrlService.js";
import Message from "@/components/Message.vue";

const originalUrl = ref('')
const messageText = ref('')
const emits = defineEmits(['setUrl'])

async function shortenUrl() {
  messageText.value = ''
  emits('setUrl', '')

  try {
    const shortenedUrl = await ShortenerUrlService.shortener(originalUrl.value)
    emits('setUrl', shortenedUrl)
  }
  catch (e) {
    messageText.value = e.response.data.message
  }
}

</script>

<style scoped>

.shortener_form {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 16px;
  align-items: flex-start;
}

.shortener_form__inputs {
  display: flex;
  flex-direction: column;
}
</style>
