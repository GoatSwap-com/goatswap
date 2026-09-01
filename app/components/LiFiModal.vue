<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-box modal-box--lifi">
          <!-- Header -->
          <div class="modal-header">
            <div>
              <h2 class="modal-title">Swap & Bridge</h2>
              <p class="modal-sub">Fast cross-chain swaps powered by LI.FI</p>
            </div>
            <button class="modal-close" @click="$emit('close')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <!-- LiFi Widget -->
          <div class="lifi-widget-container">
            <SwapService />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import SwapService from './SwapService.vue'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const handleCloseEvent = () => {
  emit('close')
}

onMounted(() => {
  window.addEventListener('lifi-modal:close', handleCloseEvent)
})

onUnmounted(() => {
  window.removeEventListener('lifi-modal:close', handleCloseEvent)
})
</script>

<style scoped>
.modal-box--lifi {
  max-width: 480px;
  width: 100%;
  padding: 24px;
  background: rgba(23, 23, 23, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.lifi-widget-container {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  min-height: 480px;
}

/* Modal transition */
.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.modal-enter-active .modal-box--lifi { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from .modal-box--lifi { transform: translateY(24px) scale(0.96); }
</style>
