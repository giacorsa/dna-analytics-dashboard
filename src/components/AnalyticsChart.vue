<script setup>
import { computed } from 'vue'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Line } from 'vue-chartjs'
import { metrics } from '../config/metricConfig'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  analytics: {
    type: Object,
    required: true
  },

  selectedMetric: {
    type: String,
    required: true
  }
})

const selectedMetricConfig = computed(() => {
  return (
    metrics.find(
      metric => metric.key === props.selectedMetric
    ) ?? metrics[0]
  )
})

const selectedData = computed(() => {
  const metricKey = selectedMetricConfig.value.key

  return props.analytics[metricKey].data
})

const chartData = computed(() => {
  return {
    labels: selectedData.value.map(item => item.date),

    datasets: [
      {
        label: selectedMetricConfig.value.label,
        data: selectedData.value.map(item => item.value)
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    intersect: false,
    mode: 'index'
  },

  plugins: {
    legend: {
      display: false
    },

    tooltip: {
      enabled: true
    }
  },

  scales: {
    x: {
      grid: {
        display: false
      }
    },

    y: {
      beginAtZero: true,

      grid: {
        color: '#eef2f7'
      }
    }
  }
}


</script>

<template>
  <section class="analytics-chart">
    <div class="analytics-chart__header">
      <div>
        <p class="analytics-chart__eyebrow">
          Performance over time
        </p>

        <h2 class="analytics-chart__title">
          {{ selectedMetricConfig.label }} trend
        </h2>
      </div>
    </div>

    <div class="analytics-chart__container">
      <Line
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </section>
</template>


<style scoped>
.analytics-chart {
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 20px;

  background: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.analytics-chart__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
}

.analytics-chart__eyebrow {
  margin: 0 0 6px;

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #6366f1;
}

.analytics-chart__title {
  margin: 0;

  font-size: 1.4rem;
  color: #111827;
}

.analytics-chart__container {
  position: relative;
  height: 400px;
}

@media (max-width: 600px) {
  .analytics-chart {
    padding: 16px;
  }

  .analytics-chart__container {
    height: 300px;
  }
}
</style>

