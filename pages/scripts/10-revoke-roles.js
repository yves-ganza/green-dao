const sdk = require('./1-init-sdk')
require('dotenv').config()

const tokenModule = sdk.getTokenModule('0x366758036472b97f2C95E1Bf6206a2f79AE34590')

const revokeRoles = async () => {
    try {
        console.log('✅ Got em => \n', await tokenModule.getAllRoleMembers())
    }catch(e){
        console.log('❌ Fetching role members failed \n', e)
    }

    try {
        console.log('🔄 Revoking roles...')
        await tokenModule.revokeRole('minter',  '0x33F9A219368b7b3BD7e6946Ebf840Bb17Cfc000F')
        await tokenModule.revokeAllRolesFromAddress(process.env.NEXT_PUBLIC_WALLET_ADDRESS)
        console.log('✅ New roles after revoking => \n', await tokenModule.getAllRoleMembers())
    }catch (e) {
        console.log('❌ Revoking roles failed \n', e)
    }
}

revokeRoles()