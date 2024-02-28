import { useAccount } from 'wagmi'
import { useAtomValue } from 'jotai'
import { useState } from 'preact/compat'
import env from 'helpers/env'
import signatureAtom from 'atoms/signature'

export default function FileUpload() {
  const { isConnected } = useAccount()
  if (!isConnected) {
    return null
  }

  const { signature, message, address } = useAtomValue(signatureAtom)
  if (!signature || !message || !address) {
    return null
  }

  const [file, setFile] = useState<File | undefined>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function uploadFile() {
    if (!file) {
      return
    }
    setLoading(true)
    setSuccess(false)
    setErrorMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${env.VITE_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        setErrorMessage(
          `${response.statusText}: ${(await response.json()).message}`
        )
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `${error}`
      setErrorMessage(errorMessage)
      console.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        className="file-input file-input-bordered file-input-primary"
        onChange={(event) => {
          setFile(event.currentTarget?.files?.[0])
        }}
      />
      <button
        class="btn btn-active btn-primary"
        onClick={uploadFile}
        disabled={loading}
      >
        {loading && '🤔 '}Upload!
      </button>
      {success && (
        <div role="alert" class="alert alert-success">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Success!</span>
        </div>
      )}
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
