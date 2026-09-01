<template>
  <ClientOnly>
    <div class="swap-widget-container">
      <Widget :config="widgetConfig" @routeExecutionCompleted="onSwapSuccess" @routeExecutionFailed="onSwapError"
        @routeSelected="onRouteSelected" @availableRoutes="onAvailableRoutes" />
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'
import { LiFiWidgetWithEvents, extractUsdAmounts } from '@/utils/LiFiWidgetWithEvents.js'
import { applyPureReactInVue } from 'veaury'
import { createRoot } from 'react-dom/client'
import { setVeauryOptions } from 'veaury'

const currentUSDValue = ref(0)

if (typeof window !== 'undefined') {
  setVeauryOptions({
    react: {
      createRoot
    }
  })
}
const Widget = applyPureReactInVue(LiFiWidgetWithEvents)
const widgetConfig = ref({
  integrator: 'GoatSwap',
  theme: {
    container: {
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      background: 'rgba(23, 23, 23, 0.8)',
    },
  },
})

function onRouteSelected({ route }) {
  const { fromAmountUSD } = extractUsdAmounts(route)
  currentUSDValue.value = fromAmountUSD
}

function onAvailableRoutes(routes) {
  const best = routes?.[0]
  if (best) {
    currentUSDValue.value = extractUsdAmounts(best).fromAmountUSD
  }
}

const onSwapSuccess = () => {
  // LI.FI swap completed in the widget.
}

const onSwapError = () => {
  // LI.FI swap failed in the widget.
}

</script>

<style scoped>
.swap-widget-container {
  position: relative;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  min-height: 480px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
