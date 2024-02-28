import { signMessage } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAtom } from 'jotai'
import { useState } from 'preact/hooks'
import signatureAtom from 'atoms/signature'
import wagmiConfig from 'helpers/wagmiConfig'

export default function () {
  const { address: currentlyConnectedAccount, isConnected } = useAccount()
  if (!isConnected) {
    return null
  }

  const [{ signature, message, address }, setSignature] = useAtom(signatureAtom)
  if (signature && message && address === currentlyConnectedAccount) {
    return (
      <p>
        Thank you for providing a signature for{' '}
        <code className="break-all">{address}</code>!
      </p>
    )
  }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div className="flex flex-col gap-2">
      <button
        className="btn btn-secondary"
        disabled={loading}
        onClick={async () => {
          console.log(address)
          if (!currentlyConnectedAccount) {
            return
          }
          const message = `Sign this message to prove ownership of ${currentlyConnectedAccount}`
          setLoading(true)
          setErrorMessage('')
          try {
            const signature = await signMessage(wagmiConfig, {
              message,
            })
            setSignature({
              signature,
              message,
              address: currentlyConnectedAccount,
            })
          } catch (error) {
            const newErrorMessage =
              error instanceof Error ? error.message : `${error}`
            setErrorMessage(newErrorMessage)
            console.error(newErrorMessage)
          } finally {
            setLoading(false)
          }
        }}
      >
        Sign message
      </button>
      {errorMessage && (
        <div role="alert" class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {errorMessage}</span>
        </div>
      )}
    </div>
  )
}
