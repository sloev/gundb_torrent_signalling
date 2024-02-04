import createCone from 'van-cone';
import van from "vanjs-core"
import { MapPage } from './pages/mapPage'
import { ListPage } from './pages/listPage'
import { NotFoundPage } from './pages/notFoundPage'
import { NewItemPage } from './pages/newItemPage'
import { TvPage } from './pages/tvPage'
import banner from './images/banner.gif'
import wool from './images/wool.webp'
const { a, div, h3, img, li, nav, p, ul } = van.tags




// create the spa object
export const routerElement = div({ id: 'layout', class: "content" })
const { link, route } = createCone({ routerElement: routerElement })

route('home', '/', MapPage, { title: 'SaySheep' })
route('mapItem', '/map/', MapPage, { title: 'SaySheep | map' })
route('list', '/list', ListPage, { title: 'SaySheep | list' })
route('new', '/new', NewItemPage, { title: 'SaySheep | new' })
route('tv', '/tv', TvPage, { title: 'SaySheep | tv' })
route('notFound', '.*', NotFoundPage, { title: 'SaySheep| Not Found' })


export const navBar = () => {
    return div(
        nav({ class: "navbar",style:'background-image: url("'+wool+'");'},
        img({src:banner, class: 'navbar-banner' }),
            link({ name: 'home', class: 'navbar-link' }, 'Map 🗺️'),
            link({ name: 'list', class: 'navbar-link' }, 'List 📑'),
            link({ name: 'new', class: 'navbar-link' }, 'New 🐑'),
            link({ name: 'tv', class: 'navbar-link' }, 'TV 📺'),
        )
    )
}

