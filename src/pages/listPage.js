
import van from "vanjs-core"
import { getDb } from '../db/db.js'
import { getStore } from '../store.js'

const { a, div, h3, img, li, nav, p, ul } = van.tags

const db = getDb();
const store = getStore()

export const ListPage = () => {
    return div(
        h3("listPage")
    )
}