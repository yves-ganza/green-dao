import '../styles/globals.css'
import {ThirdwebWeb3Provider} from '@3rdweb/hooks'
import 'regenerator-runtime/runtime'

function MyApp({ Component, pageProps }) {
  const chains = [1, 4]
  const connectors = {
    injected: {},
    walletconnect: {}
  }

  return(
      <ThirdwebWeb3Provider connectors={connectors} supportedChainIds={chains}>
        <Component {...pageProps} />
      </ThirdwebWeb3Provider>
  )
}

export default MyApp
