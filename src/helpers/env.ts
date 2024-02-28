import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_WALLET_CONNECT_PROJECT_ID: str(),
})
