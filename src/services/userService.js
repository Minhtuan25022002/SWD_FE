import axios from "../axios"

const handleLoginAdmin = (userName, userPassword) => {
    return axios.post('api/login-admin', { username: userName, password : userPassword });
}

const handleLogOut = () => {
    return axios.get('api/logout');
}

const getAllMembers = () => {
    return axios.get('/api/members');
}

export { 
    handleLoginAdmin,
    getAllMembers, 
    handleLogOut
}