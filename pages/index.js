import styles from '../styles/Home.module.css'
import {useWeb3} from '@3rdweb/hooks'

import {createMembershipNft} from "./scripts/3-create-nft"

export default function Home() {
    const {connectWallet, address, balance, error, provider, chainId} = useWeb3()

    if(!address) return <button onClick={connectWallet}>Connect Wallet</button>
    if(error) return <p>{error}</p>

    return(
        <div className={`${styles.main} ${styles.hyper}`}>
            <h1>👋Welcome to GreenDAO community</h1>
            <p>Address: {address}</p>
            <p>Balance: {balance.formatted} ETH</p>
            <button onClick={createMembershipNft}>Create NFT</button>
        </div>
    )
}
