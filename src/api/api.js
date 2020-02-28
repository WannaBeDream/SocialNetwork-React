import * as axios from 'axios';



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c870a05e-676a-43c1-8892-c52421efbe6c"
    }
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    userUnfollow(userId) {
        return instance.delete(`follow/${userId}`)

    },
    userFollow(userId) {
        return instance.post(`follow/${userId}`)
    },
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
    }

    

}

export const authAPI = {
    authMeWithCredentials() {
        return instance.get(`auth/me`)
    }
}


