const sdk = require("./1-init-sdk")
const {ethers} = require("ethers")
require('dotenv').config('/Users/mack/Desktop/green-dao/.env.local')

const app = sdk.getAppModule('0x09bEe13a2AD9D9Ff254ff252f72F43D32dC24A61')

const createToken = async () => {
    try{
        const tokenModule = await app.deployTokenModule({
            name: 'GreenDAO Governance Token',
            symbol: 'ANKH'
        })
        console.log('✅ Success, Token address: ', tokenModule.address)
        process.exit(0)
    }catch (e) {
        console.error('❌ Error: ', e)
        console.error('❗️Token Deployment Failed')
        process.exit(1)
    }
}

const mintToken = async () => {
    try{
        const amount = 7_999_999_999
        const amount18Decimals = ethers.utils.parseUnits(amount.toString(), 18)
        const tokenModule = await sdk.getTokenModule('0x366758036472b97f2C95E1Bf6206a2f79AE34590')
        await tokenModule.mint(amount18Decimals)
        const totalAmountSupplied = await tokenModule.totalSupply()
        console.log('✅ Success, Token Minted with total supply: ', totalAmountSupplied)
        process.exit(0)
    }catch (e) {
        console.error('❌ Error: ', e)
        console.error('❗️Minting Failed')
        process.exit(1)
    }
}

// createToken()
mintToken()