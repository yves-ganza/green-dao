const sdk = require('./1-init-sdk')
const {ethers} = require('ethers')
require('dotenv').config()

const voteModule = sdk.getVoteModule(process.env.NEXT_PUBLIC_VOTE_MODULE_ADDRESS)
const tokenModule = sdk.getTokenModule('0x366758036472b97f2C95E1Bf6206a2f79AE34590')

const supplyPower = async () => {
    try{
        await tokenModule.grantRole('minter', voteModule.address)
        console.log('✅ Minter role granted')
    }catch (e){
        console.log('❌ ', e)
        console.log('❌ Permission granting failed!')
        process.exit(1)
    }

    try{
        const balance = await tokenModule.balanceOf(process.env.NEXT_PUBLIC_WALLET_ADDRESS)
        const amount = ethers.BigNumber.from(balance.value)
        const supply = amount.div(100).mul(90)

        console.log('🔄 Transferring tokens...')
        await tokenModule.transfer(voteModule.address, supply)
        console.log('✅ Successfully transferred tokens to the vote module🎉')
        process.exit(0)
    }catch (e) {
        console.log('❌ ', e)
        console.log('❌ Vote power supply failed!')
        process.exit(1)
    }
}

supplyPower()