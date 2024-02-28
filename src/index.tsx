import 'helpers/polyfills'
import 'index.css'
import { render } from 'preact'
import App from 'App'
import Wallet from 'components/Wallet'

render(
  <Wallet>
    <App />
  </Wallet>,
  document.getElementById('root') as Element
)
