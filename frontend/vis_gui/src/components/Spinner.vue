<template>
  <div class="spinner">
    <i class="fa-solid fa-spinner"></i>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style scoped>
div {
  overflow: hidden;
}

i {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 2rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
