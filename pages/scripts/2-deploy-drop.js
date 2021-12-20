import {ethers} from 'ethers'

import sdk from './1-init-sdk'

const app = sdk.getAppModule('0x09bEe13a2AD9D9Ff254ff252f72F43D32dC24A61')

export const deploy = async () => {
    try{
        const bundleDropModule = await  app.deployBundleDropModule({
            name: 'GreenDAO membership',
            description: 'A DAO of go-greeners',
            primarySaleRecipientAddress: ethers.constants.AddressZero,
            image: 'https://ipfs.io/ipfs/QmYMR33d9tLYnu7zC2X6WZWzaeeZxA8wUGzNXb6f9Mp6hN?filename=gogreen.jpeg'
        })
        console.log('🔄 Deploying...')
        console.log('✅ Successfully deployed BundleDrop module, Address: ', bundleDropModule.address)
        console.log('✅ Drop metadata: ', await bundleDropModule.getMetadata())
    }catch (e) {
        console.error('❌ Error: ', e)
        console.error('❌ Deployment failed')
    }
}
