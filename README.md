# DnA Analytics Dashboard

DnA Analytics Dashboard is a Vue.js web application created to monitor the main analytics metrics of the fictional scientific publication DnA.

The dashboard retrieves analytics data from a remote API and allows users to inspect the historical trend of each metric through an interactive line chart.

## Features

- Display of the main analytics KPIs:
  - Subscriptions
  - Impressions
  - Clicks
  - Average Time
- Interactive metric selection
- Dynamic line chart
- Remote data loading with Axios
- Loading and error states
- Retry functionality
- Responsive layout
- Keyboard-accessible metric cards
- Realtime Impressions simulation (+5 every 2 seconds)

## Technologies

- Vue.js
- Vite
- JavaScript
- Axios
- Chart.js
- vue-chartjs
- CSS

## Project Structure

```text
src/
├── api/
│   └── analyticsApi.js
├── assets/
│   └── styles.css
├── components/
│   ├── AnalyticsChart.vue
│   ├── DashboardHeader.vue
│   ├── MetricCard.vue
│   └── MetricGrid.vue
├── composables/
│   └── useAnalytics.js
├── config/
│   └── metricConfig.js
├── App.vue
└── main.js
```

## Architecture

The project separates responsibilities into different layers.
analyticsApi.js handles communication with the remote API.
useAnalytics.js manages analytics state, loading and error states, retry logic, and the realtime Impressions simulation.
App.vue acts as the main application orchestrator and owns the currently selected metric.
MetricGrid.vue and MetricCard.vue render the KPI cards and communicate user selection through Vue custom events.
AnalyticsChart.vue renders the historical data of the selected metric using Chart.js.
metricConfig.js provides a single shared configuration for the available metrics.

## Data Flow

The application follows Vue's one-way data flow:
API
↓
analyticsApi
↓
useAnalytics
↓
App
↓ props

## Components

User interaction travels in the opposite direction through custom events:
MetricCard
↓ select event
MetricGrid
↓ select event
App
↓
selectedMetric
↓
AnalyticsChart

## Installation

Clone the repository and install the dependencies:

```text
npm install
```

Start the development server:

```text
npm run dev
```

## Production Build

Create a production build:

```text
npm run build
```

Preview the production build:

```text
npm run preview
```

## Analytics API

The project retrieves analytics data from the DnA Analytics API.

## Author

Giovanni Corsato
