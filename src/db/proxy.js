// MIT (C) Dletta 2021
// https://github.com/Dletta/dht-proxy/blob/main/websocketproxy.js

import { joinRoom } from 'trystero';
const debug = true


export const GunProxy = function () {
    const proxy = { senders: [], listeners: [], shutdowns: [] };


    // initialize to receive back the proxy object for a specific configuration
    proxy.initialize = function (config) {

        const trystero_room = joinRoom({ appId: config.appId, trackerUrls: config.trackerUrls }, config.roomName)
        trystero_room.onPeerJoin(id => console.log(`Trystero ID: ${id} joined`))
        trystero_room.onPeerLeave(id => console.log(`Trystero ID: ${id} left`))
        const [sendMsg, onMsg] = trystero_room.makeAction('gun-protocol')
        onMsg(proxy.receiver)
        proxy.addSender(sendMsg)
        proxy.addShutdown(trystero_room.leave)

        // WebSocketProxy definition

        const WebSocketProxy = function (url) {
            const websocketproxy = {};

            websocketproxy.url = url || 'ws:proxy';
            proxy.proxyurl = url || 'ws:proxy';
            websocketproxy.CONNECTING = 0;
            websocketproxy.OPEN = 1;
            websocketproxy.CLOSING = 2;
            websocketproxy.CLOSED = 3;
            websocketproxy.readyState = 1;
            websocketproxy.bufferedAmount = 0;
            websocketproxy.onopen = function () { };
            websocketproxy.onerror = function () { };
            websocketproxy.onclose = function () { };
            websocketproxy.extensions = '';
            websocketproxy.protocol = '';
            websocketproxy.close = { code: '4', reason: 'Closed' };
            websocketproxy.onmessage = function () { }; //overwritten by gun
            websocketproxy.binaryType = 'blob';
            websocketproxy.send = proxy.sender;

            return websocketproxy
        }

        return WebSocketProxy
    };


    proxy.addListener = function (listener) {
        proxy.listeners.push(listener)
    };

    proxy.receiver = function (data) {
        if (debug) console.log('----------> Receiver')
        if (debug) console.log(data)

        proxy.listeners.forEach((fn, i) => {
            fn(data)
        });

    };


    proxy.addSender = function (sender) {
        proxy.senders.push(sender)
    };

    proxy.addShutdown = function (shutdown) {
        proxy.shutdowns.push(shutdown)
    };

    proxy.sender = function (msg) {
        if (debug) console.log('<---------- Sender')
        if (debug) console.log(msg)
        proxy.senders.forEach((fn, i) => {
            fn(msg)
        });

    }

    proxy.attachGun = function (gun) {
        proxy.addListener(gun._.opt.peers[proxy.proxyurl].wire.onmessage)
    }

    proxy.shutdown = function () {
        proxy.shutdowns.forEach((fn, i) => {
            fn()
        })
    };

    return proxy
}