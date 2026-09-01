import veauryVitePlugins from 'veaury/vite/index.js'

// https://nuxt.com/docs/api/configuration/nuxt-config - env reload
export default defineNuxtConfig({
  vite: {
    plugins: [
      veauryVitePlugins({
        type: 'vue',
        isNuxt: true,
        reactOptions: {
          fastRefresh: false,
        },
      }),
    ],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  devServer: {
    port: 3012,
  },

  build: {
    transpile: ['swiper'],

  },

  modules: ['@nuxt/image'],

  app: {
    head: {
      title: 'GoatSwap — The GOAT DEX Protocol',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'GoatSwap is the greatest of all time decentralized exchange protocol. Swap tokens with zero slippage, low fees, and instant execution.',
        },
        { property: 'og:title', content: 'GoatSwap — The GOAT DEX Protocol' },
        {
          property: 'og:description',
          content: 'Swap tokens with zero slippage, low fees, and instant execution.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Inter:wght@300..900&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      walletIconsUrl: process.env.NUXT_PUBLIC_WALLET_ICONS_URL || '/wallets/',
      airdropContract: process.env.NUXT_PUBLIC_WX || '0xa4b03CEa2f67cC4f1d60Ed14c7f05D098788d2b6',
      airdropToken: process.env.NUXT_PUBLIC_TOKEN || '0xd1770254071Be4d7b26683191Dc6C0D2E8dBD7Da',
      stakingContract: process.env.NUXT_PUBLIC_STAKING || '0x926a2FaB7a26C946f5A1A217DF89cA345B9F6364' // Deployed SimpleStaking
    },
  },
})
