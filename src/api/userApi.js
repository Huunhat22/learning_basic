import axiosClient from "./axiosClient";


// setup api cho user
const userApi = {

    register(data){
        const url = '/auth/local/register';
        return axiosClient.post(url,data);
    },

};

export default userApi;
