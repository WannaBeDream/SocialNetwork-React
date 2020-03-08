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
        return instance.delete(`follow/${userId}`);

    },
    userFollow(userId) {
        return instance.post(`follow/${userId}`);
    },
    getUserProfile(userId) {
        console.warn(" Obsolete method. Please profileAPI object. ")
        return profileAPI.getUserProfile(userId);
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateUserStatus(status) {
        return instance.put(`profile/status`, {
            status: status
        });    
    }

}

export const authAPI = {
    authMeWithCredentials() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe });
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}


