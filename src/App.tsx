import { ConnectButton } from '@rainbow-me/rainbowkit'
import FileUpload from 'components/FileUpload'
import SignMessage from 'components/SignMessage'

export default function () {
  return (
    <div className="container mx-auto max-w-prose p-10 prose">
      <h1>OnlyFrames</h1>
      <p>
        G'day, user! Welcome to OnlyFrames where you can upload images as
        token-gated frames.
      </p>
      <p>
        Connect a wallet that is connected to a Farcaster account, select an
        image, specify the token chain, address, and (optionally) token ID (for
        ERC1155), hit the "Upload!" button and get a shareable URL that you can
        paste anywhere on Warpcast! Only the users holding the token you've
        specified will be able to see it.
      </p>
      <div className="my-2">
        <ConnectButton />
      </div>
      <SignMessage />
      <FileUpload />
      <p>
        Made with love by{' '}
        <a href="https://warpcast.com/borodutch" target="_blank">
          @borodutch
        </a>
        , consider a follow!
      </p>
    </div>
  )
}
