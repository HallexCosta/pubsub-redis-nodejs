const Redis = require('ioredis')

const EMAIL_CHANNEL = 'email-channel'

const getRedisService = () => {
    const redis = new Redis()
    
    redis.on('error', (err) => {
        console.log('Error on redis')
        process.exit(1)
    })
    redis.on('connect', () => {
        console.log('redis connected')
    })

    return redis
}

const sendMessageToChannel = async ({
    message,
    queueChannel,
    redis
}) => {
    await redis.publish(queueChannel, JSON.stringify(message))
    console.log('>> Message published with content', message)
}


module.exports = {getRedisService, sendMessageToChannel, EMAIL_CHANNEL}