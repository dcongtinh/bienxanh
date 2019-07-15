import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().auth + path
}

const userAPI = {
    login: ({ username, password }) =>
        axios.post(c('/login'), {
            username,
            password
        }),
    register: ({ firstname, lastname, username, password, email, siteAdmin }) =>
        axios.post(c('/register'), {
            firstname,
            lastname,
            username,
            password,
            email,
            siteAdmin
        }),
    getUser: ({ username }) => axios.post(c('/get-user'), { username }),
    getAllUser: () => axios.post(c('/get-users')),
    updateProfile: ({ username, firstname, lastname, siteAdmin }) =>
        axios.put(c('/update'), { username, firstname, lastname, siteAdmin }),
    deleteUsers: ({ usernames }) => axios.post(c('/delete'), { usernames }),
    me: () => axios.get(c('/me'))
}

export default userAPI
