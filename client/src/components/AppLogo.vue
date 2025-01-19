<template>
  <div class="app_logo">
    <img
        class="app_logo__icon"
        src="../assets/vue.png"
    />
    <h1 class="app_logo__text">
      Кликер
    </h1>
  </div>
</template>

<script setup>

</script>

<style scoped>

.app_logo {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.app_logo__icon {
  width: 50px;
  height: 50px;
}

.app_logo__text {
  color: #2f3747;
}
</style>
