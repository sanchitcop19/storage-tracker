const dropbox = require('dropbox')
const config = require('./config.json')
const providers = { DROPBOX: 'dropbox' }

let totalUsed = 0;
let totalAllocated = 0;

async function getStorage({ provider }) {
    if (provider === providers.DROPBOX) {
        const dbx = new dropbox.Dropbox({ accessToken: config.Auth[providers.DROPBOX].accessToken });
        const { result } = await dbx.usersGetSpaceUsage();

        totalUsed += result.used;
        totalAllocated += result.allocation.allocated;
    }

}

function precise({ number, precision }) {
    return Number.parseFloat(number).toPrecision(precision)
}

Object.values(providers).forEach(async provider => {
    const storage = await getStorage({ provider });
    console.log(`Used: ${precise({ number: totalUsed / 1000000000, precision: 2 })} GB, Allocated: ${precise({ number: totalAllocated / 1000000000, precision: 2 })} GB, Usage Ratio: ${precise({ number: totalUsed * 100 / totalAllocated, precision: 2 })} %`);
})
