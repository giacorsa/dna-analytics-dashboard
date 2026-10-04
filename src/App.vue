<script setup>
import { ref } from 'vue'

import DashboardHeader from './components/DashboardHeader.vue'
import MetricGrid from './components/MetricGrid.vue'
import AnalyticsChart from './components/AnalyticsChart.vue'
import { useAnalytics } from './composables/useAnalytics'

const dashboardTitle = 'DnA Analytics'
const dashboardSubtitle = 'Scientific publication analytics dashboard'

const selectedMetric = ref('subscriptions')

const {
  analytics,
  loading,
  error,
  retry
} = useAnalytics()

function handleMetricSelect(metricKey) {
  selectedMetric.value = metricKey
}
</script>

<template>
  <main class="dashboard">
    <div class="dashboard__container">
      <DashboardHeader
        :title="dashboardTitle"
        :subtitle="dashboardSubtitle"
      />

      <p
        v-if="loading"
        class="dashboard__status"
      >
        Caricamento dati...
      </p>

      <div
        v-else-if="error"
        class="dashboard__status dashboard__status--error"
      >
        <p class="dashboard__error-message">
          {{ error }}
        </p>

        <button
          type="button"
          class="dashboard__retry"
          @click="retry"
        >
          Riprova
        </button>
      </div>


      <div
        v-else-if="analytics"
        class="dashboard__content"
      >
        <MetricGrid
          :analytics="analytics"
          :selected-metric="selectedMetric"
          @select="handleMetricSelect"
        />

        <AnalyticsChart
          :analytics="analytics"
          :selected-metric="selectedMetric"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 48px 24px;
}

.dashboard__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard__content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dashboard__status {
  padding: 24px;
  background: white;
  border-radius: 12px;
}

.dashboard__status--error {
  color: #b42318;
  background: #fef3f2;
}

.dashboard__error-message {
  margin: 0;
}

.dashboard__retry {
  margin-top: 16px;
  padding: 10px 16px;

  border: 0;
  border-radius: 8px;

  background: #b42318;
  color: #ffffff;

  font-weight: 600;
  cursor: pointer;
}

.dashboard__retry:hover {
  opacity: 0.9;
}

.dashboard__retry:focus-visible {
  outline: 3px solid rgba(180, 35, 24, 0.25);
  outline-offset: 3px;
}



@media (max-width: 600px) {
  .dashboard {
    padding: 24px 16px;
  }

  .dashboard__content {
    gap: 24px;
  }
}
</style>
