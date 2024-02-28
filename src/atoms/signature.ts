import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage('signature', {
  signature: '',
  message: '',
  address: '',
})
