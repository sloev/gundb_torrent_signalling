
import { Server } from 'bittorrent-tracker'

const server = new Server({
  udp: false, // enable udp server? [default=true]
  http: true, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: true, // enable web-based statistics? [default=true]
  trustProxy: false, // enable trusting x-forwarded-for header for remote IP [default=false]
  filter: function (infoHash, params, cb) {
    // Blacklist/whitelist function for allowing/disallowing torrents. If this option is
    // omitted, all torrents are allowed. It is possible to interface with a database or
    // external system before deciding to allow/deny, because this function is async.

    // It is possible to block by peer id (whitelisting torrent clients) or by secret
    // key (private trackers). Full access to the original HTTP/UDP request parameters
    // are available in `params`.

    // This example only allows one torrent.
    const allowedInfoHashes =  [
      '3665367962366f34703164316e32353666357733'
    ]
    const allowed = allowedInfoHashes.includes(infoHash)
    console.log("infoHASH", infoHash, allowed)
    if (allowed) {
      // If the callback is passed `null`, the torrent will be allowed.
      cb(null)
    } else {
      // If the callback is passed an `Error` object, the torrent will be disallowed
      // and the error's `message` property will be given as the reason.
      cb(new Error('disallowed torrent'))
    }
  }
})



server.on('error', function (err) {
  // fatal server error!
  console.log(err.message)
})

server.on('warning', function (err) {
  // client sent bad data. probably not a problem, just a buggy client.
  console.log(err.message)
})

server.on('listening', function () {
  // fired when all requested servers are listening


  // WS
  const wsAddr = server.ws.address()
  const wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost'
  const wsPort = wsAddr.port
  console.log(`WebSocket tracker: ws://${wsHost}:${wsPort}`)

})


// start tracker server listening! Use 0 to listen on a random free port.
const port = 9002
const hostname = "localhost"
server.listen(port, hostname, () => {
  // Do something on listening...
})
