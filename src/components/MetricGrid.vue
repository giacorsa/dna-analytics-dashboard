<script setup>
import MetricCard from './MetricCard.vue'
import { metrics } from '../config/metricConfig'

defineProps({
  analytics: {
    type: Object,
    required: true
  },

  selectedMetric: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['select'])

function formatValue(value, format) {
  if (format === 'time') {
    const minutes = Math.floor(value / 60)
    const seconds = value % 60

    return `${minutes}m ${seconds}s`
  }

  return value.toLocaleString()
}
</script>

<template>
  <section class="metric-grid">
    <MetricCard
      v-for="metric in metrics"
      :key="metric.key"
      :metric-key="metric.key"
      :label="metric.label"
      :value="formatValue(
        analytics[metric.key].total,
        metric.format
      )"
      :active="metric.key === selectedMetric"
      @select="emit('select', $event)"
    />
  </section>
</template>

<style scoped>
.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 900px) {
  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }
}
</style>
