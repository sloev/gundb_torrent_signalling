import GUN from 'gun';

import 'gun/sea.js';
import 'gun/lib/open.js'
import 'gun/lib/load.js'
import 'gun/lib/promise.js'

import {GunProxy} from './proxy'

let db = {
    tables : {
        users: null,
        messages: null,
        new_article: null,
    },
    gun: null
}

export const setupDb = (config, creds) => {


    // instantiate module
    var proxy = new GunProxy()
    // configure websocket
    var WebSocketProxy = proxy.initialize(config)

    // pass websocket as custom websocket to gun instance
    // make sure localStorage / indexedDB is on
    var gun = Gun({ peers: ["proxy:websocket"], WebSocket: WebSocketProxy })

    

    const setup=()=>{
        proxy.attachGun(gun)

        for (const table in db.tables) {
            db.tables[table] = gun.user(creds.serverPublicKey).get(table)
        }
    }

    setTimeout(setup, 100)

    db.gun = gun
    return db
}

export const getDb = ()=>db
