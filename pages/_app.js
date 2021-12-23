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
      <div className='relative flex flex-col items-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 min-h-screen font-mono overflow-x-hidden'>
          <ThirdwebWeb3Provider connectors={connectors} supportedChainIds={chains}>
              <Component {...pageProps} />
          </ThirdwebWeb3Provider>
      </div>

  )
}

export default MyApp
