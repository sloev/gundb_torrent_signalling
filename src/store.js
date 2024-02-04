import * as vanX from "vanjs-ext"
import L from "leaflet";


let store;
export const getStore = () => {
    if (!store) {
        store = vanX.reactive({
            dbIsLoading: false,
            mapIsLoading: false,
        })
        store.isLoading = vanX.calc(() => [store.dbIsLoading, store.mapIsLoading].some(x => !!x))
    }
    return store
}
