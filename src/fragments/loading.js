import van from "vanjs-core"
const { div, img } = van.tags

import { getStore } from '../store.js'
import wolk from '../images/wolk.gif';

const store = getStore()

export const Loading = () => {
    console.log(store)
    return div(
        { class: () => `loading ${store.isLoading ? "" : "fade"}` },
        div(
            img({ src: wolk, class:"image" }),
        ),
    )
}
