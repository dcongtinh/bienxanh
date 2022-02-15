const { REACT_APP_API_URL } = process.env

const config = {
    API_URL: REACT_APP_API_URL,
}

const c = (path) => {
    const cPath = config.API_URL + path
    const cPath_slashReplaced = cPath.replaceAll('//', '/')
    // console.log(cPath_slashReplaced.replace(':/', '://'))
    return cPath_slashReplaced.replace(':/', '://')
}

export const getApi = () => {
    return {
        auth: c('/auth'),
        wareHouse: c('/warehouses'),
        item: c('/items'),
        unit: c('/units'),
        order: c('/orders'),
        supplier: c('/suppliers'),
        export: c('/exports'),
    }
}

export default config
