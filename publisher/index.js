const { server } = require('./core/server')

server.start()

// http.createServer(async (request, response) => {
//     request.body = ''
//     request.on('data', (chunk) => {
//         request.body += chunk;
//     });

//     request.on('end', async () => {
//         routes[request.method][request.url]?.call(null, request, response) ?? routes.default(response)
//     });
// }).listen(3333, () => console.log('Server runnning on 3333'))