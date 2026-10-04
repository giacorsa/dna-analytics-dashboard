<script setup>
    defineProps({
    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String,
        default: ''
    }
    })
</script>

<template>
  <header class="dashboard-header">
    <p class="dashboard-header__eyebrow">
      DnA
    </p>

    <h1 class="dashboard-header__title">
      {{ title }}
    </h1>

    <p class="dashboard-header__subtitle">
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped>
.dashboard-header {
  margin-bottom: 32px;
}

.dashboard-header__eyebrow {
  margin: 0 0 8px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6366f1;
}

.dashboard-header__title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.1;
  color: #111827;
}

.dashboard-header__subtitle {
  max-width: 640px;
  margin: 12px 0 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
}
</style>
