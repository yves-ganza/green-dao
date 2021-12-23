const sdk = require('./1-init-sdk')
const {ethers} = require('ethers')


const bundleDropModule = sdk.getBundleDropModule('0x99C00b0225ba5f1b675f64A2BF87Cea97538dcCC')
const tokenModule = sdk.getTokenModule('0x366758036472b97f2C95E1Bf6206a2f79AE34590')

const airDrop = async () => {
    try {
        const allAddresses = await bundleDropModule.getAllClaimerAddresses('0')
        if(allAddresses.length === 0){
            console.log('👀 Get some friends to join buddy!')
            process.exit(1)
        }

        const targets = allAddresses.map(address => {
            const amount = Math.floor(((Math.random() * 5000) + 1000))
            console.log('👨🏾‍💻 Going to airdrop exactly %s token to %s',amount, address)
            return{
                address,
                amount: ethers.utils.parseUnits(amount.toString(), 18)
            }
        })

        console.log('🔄 Starting airdrop...')
        await tokenModule.transferBatch(targets)
        console.log('✅ Airdrop successfully executed\n😅')
        process.exit(0)
    }catch (e) {
        console.error('❌ Error: ', e)
        console.error('❗Airdrop Failed')
        process.exit(1)
    }
}

airDrop()