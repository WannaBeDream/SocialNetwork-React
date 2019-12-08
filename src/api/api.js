import * as axios from 'axios';



const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "6331f82f-4f98-4f15-b5e0-9b03f529a690"
        }
});


export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
              return response.data;
          });
      },
    userUnfollow(userId) {              
        return  instance.delete(`follow/${userId}`)

    },
    userFollow(userId) {
        return  instance.post(`follow/${userId}`)
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


