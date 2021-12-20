// import sdk from './1-init-sdk'
// import {readFileSync} from 'fs'

const sdk = require('./1-init-sdk')
const {readFileSync} = require('fs')

console.log(__dirname)

const bundleDrop = sdk.getBundleDropModule('0x99C00b0225ba5f1b675f64A2BF87Cea97538dcCC');

const createMembershipNft = async () => {
    const file = readFileSync('/Users/mack/Desktop/green-dao/public/gogreen.jpeg')
    console.log(file)
    try{
        console.log('🔄 Creating...')
        await bundleDrop.createBatch([{
            name: 'Tree of life',
            description: 'This NFT will give you access to the DAO as a member',
            image: file
        }])

        console.log('✅ Membership NFT created!')
        process.exit(0)
    }catch (e) {
        console.error('❌ Error: ', e)
        console.log('❗️Membership NFT creation failed!')
        process.exit(1)
    }
}

createMembershipNft()