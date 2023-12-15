const { EMAIL_CHANNEL, getRedisService } = require("../common/redis")

const listenChannel = async(redis) => {
    // start subscribe application on channel
    await redis.subscribe(EMAIL_CHANNEL, (err) => {
        if (err) {
            return console.error('error', err.message)
        }
        console.log('Subcribed with successfully')

    })

    // always receive a new message redis called this event
    redis.on('message',  (channel, message) => {
        const parsed = JSON.parse(message)

        console.log('>> Received from %s',channel, parsed)
    })
}

async function main() {
    // get dependencies
    const redis = getRedisService()
    // inject redis dependencies
    await listenChannel(redis)
}

main()