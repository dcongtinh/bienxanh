import axios from 'axios'

import { getToken } from 'utils/auth'

const getHeaders = async () => {
    var headers = {
        Accept: 'application/json'
    }
    const authToken = getToken()
    if (authToken) {
        headers = {
            ...headers,
            Authorization: authToken
        }
    }
    return headers
}

const wrapHeaderToken = func => (url, ...args) => {
    return new Promise(async (resolve, reject) => {
        const attributes = {
            cache: true,
            headers: await getHeaders()
        }
        func(url, ...args, attributes)
            .then(({ data, status }) => {
                resolve({ data, status, success: true })
            })
            .catch(e => {
                if (e.response) {
                    const { data, status } = e.response
                    resolve({ data, status, error: true })
                } else {
                    reject(e)
                }
            })
    })
}

export default {
    get: (url, ...args) => {
        return wrapHeaderToken(axios.get)(url, ...args)
    },
    post: (url, data, ...args) =>
        wrapHeaderToken(axios.post)(url, data, ...args),
    put: (url, data, ...args) => wrapHeaderToken(axios.put)(url, data, ...args),
    delete: (url, ...args) => wrapHeaderToken(axios.delete)(url, ...args)
}
