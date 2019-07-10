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
    register: ({ firstname, lastname, username, password, email }) =>
        axios.post(c('/register'), {
            firstname,
            lastname,
            username,
            password,
            email
        }),
    getUser: ({ username }) => axios.post(c('/get-user'), { username }),
    getAllUser: () => axios.post(c('/get-users')),
    updateProfile: ({ username, firstname, lastname }) =>
        axios.post(c('/update'), { username, firstname, lastname }),
    deleteUsers: ({ usernames }) => axios.post(c('/delete'), { usernames }),
    me: () => axios.get(c('/me'))
}

export default userAPI
