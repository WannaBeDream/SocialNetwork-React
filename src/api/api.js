import * as axios from 'axios';



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ea9e8d83-d58b-44b4-96ae-5d031cc519c5"
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


