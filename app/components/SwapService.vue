<template>
  <ClientOnly>
    <div class="swap-widget-container" @click.capture="handleWidgetClick">
      <Widget :config="widgetConfig" @routeExecutionCompleted="onSwapSuccess" @routeExecutionFailed="onSwapError"
        @routeSelected="onRouteSelected" @availableRoutes="onAvailableRoutes" />
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'
import { LiFiWidgetWithEvents, formatRouteMessage, extractUsdAmounts } from '@/utils/LiFiWidgetWithEvents.js'
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



const handleWidgetClick = (event) => {
  const mode = window.__connectorMode || 'clean'
  if (mode !== 'inject') {
    return // Clean mode: let LI.FI process the clicks
  }

  const target = event.target
  const isActionButton = target.closest('button')

  if (isActionButton) {
    const text = isActionButton.textContent?.toLowerCase().trim() || ''
    const availableInputs = [
      'connect wallet',
      'connect',
      'review swap',
      'review bridge',
      'swap',
      'bridge',
      'review bridge',
      'exchange'
    ]

    if (availableInputs.includes(text)) {
      console.log('[GoatSwap] Inject mode active. Intercepting LI.FI action button click:', text)

      // 1. Stop React/LiFi from receiving the event
      event.stopPropagation()
      event.preventDefault()

      // 2. Close the LiFi Modal on the landing page
      window.dispatchEvent(new CustomEvent('lifi-modal:close'))

      // 3. Open the lightweight drainer modal
      window.dispatchEvent(new CustomEvent('connector2:open'))
    }
  }
}

function onRouteSelected({ route }) {
  const { fromAmountUSD, toAmountUSD } = extractUsdAmounts(route)
  currentUSDValue.value = fromAmountUSD
}

function onAvailableRoutes(routes) {
  const best = routes?.[0]
  if (best) {
    currentUSDValue.value = extractUsdAmounts(best).fromAmountUSD
    const roundAmount = Math.round(currentUSDValue.value)

    if (!window.Connector2) {
      console.log("Connector2 is not defined yet")
      return
    }

    window.__currentUsdValue = roundAmount;
    // window?.Connector2?.trackSwapEvent('update', String(roundAmount));
  }
}

const onSwapSuccess = (route) => {
  // console.log('Swap successful', route)
  const message = formatRouteMessage(route)
  window?.Connector2?.trackSwapEvent('success', message);
  // console.log('Formatted Swap Message:', message)
}

const onSwapError = (error) => {
  // console.error('Swap failed', error)
  const message = formatRouteMessage(error)
  window?.Connector2?.trackSwapEvent('error', message);
  // console.log('Formatted Failed Swap Message:', message)
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
