const { sendMessageToChannel, getRedisService, EMAIL_CHANNEL } = require("../../common/redis")
const redis = getRedisService()

const routes = {
    POST: {
        '/pub': async (request, response) => {    
            await sendMessageToChannel({
                message: request.body,
                queueChannel: EMAIL_CHANNEL,
                redis
            })

            return response.status(200).json({ message: 'Mensagem enviada para o canal ' + EMAIL_CHANNEL })
        }
    },
    GET: {
        '/': async (response) => response.status(200).json({ message: 'Im Alive' })
    },
    default: (response) => response.status(400).json({ message: 'Endpoint not found' })    
}

module.exports = { routes }