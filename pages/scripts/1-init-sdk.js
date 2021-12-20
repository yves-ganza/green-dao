// import {ThirdwebSDK} from '@3rdweb/sdk'
// import {ethers} from 'ethers'

const {ThirdwebSDK} = require('@3rdweb/sdk')
const {ethers} = require('ethers')
const dotenv = require('dotenv')
dotenv.config({path: '/Users/mack/Desktop/green-dao/.env.local'})


if(!process.env.NEXT_PUBLIC_PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY == '') console.error('Private key not found')
if(!process.env.NEXT_PUBLIC_WALLET_ADDRESS || process.env.NEXT_PUBLIC_WALLET_ADDRESS == '') console.error('Wallet address not found')
if(!process.env.NEXT_PUBLIC_INFURA_API_URL || process.env.NEXT_PUBLIC_INFURA_API_URL == '') console.error('API URL not found')


const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.NEXT_PUBLIC_PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.NEXT_PUBLIC_INFURA_API_URL)
    )
);


(async () => {
    try{
        const apps = await sdk.getApps()
        console.log(`App address: ${apps[0].address}`)
    }catch (e) {
        console.log(`Failed to get apps from sdk: ${e}`)
        process.exit(1)
    }
})()

module.exports =  sdk
