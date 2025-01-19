<template>
  <div class="main">
    <div class="main__app">
      <app-logo
          class="main__app_logo"
      />
      <main-text/>
      <shortener-container/>
    </div>
  </div>
</template>

<script setup>

import AppLogo from "@/components/AppLogo.vue";
import MainText from "@/components/MainText.vue";
import ShortenerContainer from "@/components/ShortenerContainer.vue";
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #eff2f7;
}

.main__app {
  width: 700px;
}

.main__app_logo {
  align-self: flex-start;
}
</style>
