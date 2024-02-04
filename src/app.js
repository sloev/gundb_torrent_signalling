import van from "vanjs-core"


import config from './config.json'
import creds from './creds.client.json'

import { setupDb } from './db/db.js'
import { getStore } from './store.js'
import {Loading} from './fragments/loading'
import {navBar, routerElement} from './router.js'


const store = getStore()
const db = setupDb(config, creds)
const { a, div, h3, img, li, nav, p, ul } = van.tags







const App = () => {
    console.log(store)
    return div(
        navBar(),
        routerElement,
        Loading(),
        )
}

document.body.replaceChildren(App());
