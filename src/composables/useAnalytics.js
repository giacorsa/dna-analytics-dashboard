import { onMounted, onBeforeUnmount, ref } from 'vue'
import { getAnalytics } from '../api/analyticsApi'

export function useAnalytics() {
  const analytics = ref(null)
  const loading = ref(false)
  const error = ref(null)

  let impressionsTimer = null

  async function loadAnalytics() {
    loading.value = true
    error.value = null

    try {
      analytics.value = await getAnalytics()
      return true
    } catch (err) {
      error.value = 'Errore nel caricamento dei dati'
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  }

  function startRealtimeImpressions() {
    if (impressionsTimer) {
       return
    }

    impressionsTimer = setInterval(() => {
      if (analytics.value) {
        analytics.value.impressions.total += 5
        // analytics.value.subscriptions.total += 5
      }
    }, 2000)
  }

  function stopRealtimeImpressions() {
  if (impressionsTimer) {
    clearInterval(impressionsTimer)
    impressionsTimer = null
    }
  }

  async function retry() {
    stopRealtimeImpressions()

    const success = await loadAnalytics()

    if (success) {
      startRealtimeImpressions()
    }
  }

  onMounted(async () => {
    const success = await loadAnalytics()
    if (success) {
      startRealtimeImpressions()
    }
  })

  onBeforeUnmount(() => {
    stopRealtimeImpressions()
  })

  return {
    analytics,
    loading,
    error,
    loadAnalytics
  }
}
