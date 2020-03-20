import * as axios from 'axios';



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "abab3647-8bd2-49f5-b51b-4744d3edd404"
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
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });    
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile );    
    }

}

export const authAPI = {
    authMeWithCredentials() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}


