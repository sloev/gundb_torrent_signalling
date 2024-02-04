import van from "vanjs-core"


import config from './config.json'
import creds from './creds.client.json'

import { setupDb } from './db/db.js'


const db = setupDb(config, creds)
const { div } = van.tags


const App = () => {
    return div(
        "hello world")
}

document.body.replaceChildren(App());
