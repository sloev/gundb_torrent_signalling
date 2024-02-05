# gundb torrent signalling example

an example on how to solve the problem of webrtc signalling for gundb by the use of a websocket proxy, heavily inspired by Dletta 2021 and https://github.com/Dletta/dht-proxy/blob/main/websocketproxy.js

## what it uses:
* [gundb](https://github.com/amark/gun)
* [trystero](https://github.com/dmotz/trystero) (webrtc signalling using webtorrent signalling)
* vanjs (for frontent ui)

## how it works:
0. setup a private webtorrent tracker on a public url

1. an infohash is generated for app_id: 'gundb_torrent_signalling_test' and room_id: 'test'
    ```
    > npm run create_info_hash gundb_torrent_signalling_test test
    3665367962366f34703164316e32353666357733
    ```
2. a config.json is created:
    ```json
    {
        "infoHashHex": "3665367962366f34703164316e32353666357733",
        "appId": "gundb_torrent_signalling_test",
        "roomName": "test",
        "trackerUrls":["wss://tracker.com"]
    }
    ```
3. a set of public and private credentials for the app is created, resulting in creds.client.json and creds.server.json
```
> npm run create_root_key
```
4. db is initialized with config.json and creds (this initializes the proxy and thereby the trystero webtorrent signalling)
    ```js
    const db = setupDb(config, creds)
    ```
5. edit [bin/tracker.js](bin/tracker.js) so that it has your infohash in the whitelist
6. run your private tracker on a public ip: `npm run tracker`

from here on the db is ready and will maintain its webrtc connections without bothering gundb

