<script setup>
const props = defineProps({
  metricKey: {
    type: String,
    required: true
  },

  label: {
    type: String,
    required: true
  },

  value: {
    type: [Number, String],
    required: true
  },

  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

function handleClick() {
  emit('select', props.metricKey)
}
</script>

<template>
  <button
    type="button"
    class="metric-card"
    :class="{ 'metric-card--active': active }"
    :aria-pressed="active"
    @click="handleClick"
  >
    <span class="metric-card__label">
      {{ label }}
    </span>

    <strong class="metric-card__value">
      {{ value }}
    </strong>
  </button>
</template>


<style scoped>
.metric-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  width: 100%;
  min-height: 130px;
  padding: 20px;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  background: #ffffff;

  text-align: left;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: #c7d2fe;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
}

.metric-card:focus-visible {
  outline: 3px solid rgba(99, 102, 241, 0.25);
  outline-offset: 3px;
}

.metric-card--active {
  border-color: #6366f1;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
}

.metric-card__label {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.metric-card__value {
  margin-top: auto;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  line-height: 1;
  color: #111827;
}
</style>

