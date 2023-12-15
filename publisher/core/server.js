const http = require('node:http')
const { routes } = require("../routes");

const server = http.createServer(async (request, response) => {
    request.body = ''
    response.status = (code) => {
        response.writeHead(code)
        return response
    }
    response.json = (object) => {
        return response.end(JSON.stringify(object))
    }
    response.send = (payload) => {
        return response.end(payload)
    }
    request.on('data', (chunk) => {
        request.body += chunk;
    });

    request.on('end', async () => {
        const endpointAction = routes[request.method][request.url]
        endpointAction?.call(null, request, response) ?? routes.default(response)
    });
})

server.start = (PORT) => {
    PORT ??= 3333
    server.listen(PORT, () => console.log('Server runnning on %d', PORT))
}

module.exports = { server }