import { useAccount } from 'wagmi'
import { useAtom, useAtomValue } from 'jotai'
import signatureAtom from 'atoms/signature'
import tokenAtom from 'atoms/token'

export default function () {
  const { isConnected } = useAccount()
  const { signature } = useAtomValue(signatureAtom)
  if (!isConnected || !signature) return null

  const [token, setToken] = useAtom(tokenAtom)

  return (
    <>
      <p>
        Please, enter the details for the token to be used to gate the content.
        Only users owning this token will see the content.
      </p>
      <div className="flex flex-col gap-2 my-2">
        <div className="flex flex-col">
          <div class="label">
            <span class="label-text">Network</span>
          </div>
          <select
            class="select select-bordered w-full"
            value={token.network}
            onChange={(e) =>
              setToken({ ...token, network: e.currentTarget.value })
            }
          >
            <option selected>mainnet</option>
            <option>base</option>
            <option>zora</option>
            <option>gnosis</option>
          </select>
        </div>
        <div className="flex flex-col">
          <div class="label">
            <span class="label-text">Contract address</span>
          </div>
          <input
            type="text"
            placeholder="0x..."
            class="input input-bordered w-full"
            value={token.address}
            onChange={(e) =>
              setToken({ ...token, address: e.currentTarget.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <div class="label">
            <span class="label-text">Token ID</span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full"
            value={token.id}
            placeholder="(empty)"
            onChange={(e) => setToken({ ...token, id: e.currentTarget.value })}
          />
          <div class="label">
            <span class="label-text-alt">
              (leave empty for ERC20 and ERC721)
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
