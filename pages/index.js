import styles from '../styles/Home.module.css'
import {useWeb3} from '@3rdweb/hooks'
import {ThirdwebSDK} from "@3rdweb/sdk"
import {useEffect, useState} from "react"
import {ethers} from "ethers"


const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.NEXT_PUBLIC_PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.NEXT_PUBLIC_INFURA_API_URL)
    )
)
const bundleDrop = sdk.getBundleDropModule('0x99C00b0225ba5f1b675f64A2BF87Cea97538dcCC');


export default function Home() {
    const {connectWallet, address, balance, error, provider, chainId} = useWeb3()
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
    const [status, setStatus] = useState('')

    const handleConnect = () => {
        try {
            connectWallet('injected')
            console.log(`Wallet connected!`)
        }catch(e){
            console.log(e)
            setStatus(`Error: ${e.message}`)
        }
    }


    const checkClaimStatus = async (address) => {
        try{
            const balance = await bundleDrop.balanceOf(address, 0)
            if(balance.gt(0)){
                setStatus('')
                setHasClaimedNFT(true)
                console.log('🔥 User is a member')
                return
            }
            setHasClaimedNFT(false)
            console.log('👀 No Membership')
        }catch (e) {
            console.log(e)
            setStatus(`Error: ${e.message}`)
            setHasClaimedNFT(false)
        }
    }

    const mintNFT = async () => {
        try {
            setStatus('Minting: Please wait!')
            await bundleDrop.claim(0,1)
            setStatus('')
            console.log('🎉 Woohoo NFT minted successfully, ', `https://tests.opensea.io/assets`)
            setHasClaimedNFT(true)
        }catch (e) {
            setStatus(`Error: ${e.message}`)
        }
    }

    useEffect(() => {
        setHasClaimedNFT(false)
        checkClaimStatus(address)
    }, [address])

    useEffect(() => {
        console.log('Member?: ', hasClaimedNFT)
    }, [hasClaimedNFT])

    if(!address){
        return(
            <div className={`${styles.main} ${styles.grid} ${styles.hyper}`}>
                <h1>👋Welcome to the GreenDAO community</h1>
                <button className={styles.cssBtn} onClick={handleConnect}>Connect Wallet</button>
            </div>
        )
    }

    return(
        <div className={`${styles.main} ${styles.hyper}`}>
            {
                hasClaimedNFT ?
                <div className={styles.container}>
                    <h2 className={styles.title}>🌍DAO Member Dashboard</h2>
                    <div className={`${styles.card}`}>
                        <h2>Your Wallet</h2>
                        <p>Address</p><span>{address}</span>
                        <p>Balance</p><span>{balance?.formatted} ETH</span>
                    </div>
                </div> :
                <div className={styles.card}>
                    <h2>Mint your free 🌍DAO Membership NFT</h2>
                    <button className={styles.cssBtn} onClick={mintNFT}>Mint NFT</button>
                </div>
            }
        </div>
    )
}
