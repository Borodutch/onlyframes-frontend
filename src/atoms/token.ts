import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage('token', {
  network: 'base',
  address: '',
  id: '',
})
