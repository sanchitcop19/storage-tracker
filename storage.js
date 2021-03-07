const dropbox = require('dropbox')
const providers = { DROPBOX: 'dropbox' }

async function getStorage({ provider }) {
    if (provider === providers.DROPBOX) {

    }

}


const total = 0;
Object.values(providers).forEach(async provider => {
    const storage = await getStorage({ provider })
})
console.log(total);