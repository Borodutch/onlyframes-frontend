import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet } from 'wagmi/chains'
import env from 'helpers/env'

export default getDefaultConfig({
  appName: 'OnlyFrames',
  projectId: env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet],
})
