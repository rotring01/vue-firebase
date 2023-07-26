import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        loggedIn: localStorage.getItem ('token') ? true : false ,
        user: localStorage.getItem ('user') ?? null ,
        token: localStorage.getItem ('token') ?? false ,
        errors: [] ,
    }),

    getters: {
        getToken: (state) => state.token,
        getUser: (state) => JSON.parse(state.user),
        getErrors: (state) => state.errors,

    },

    actions: {
        async csrf(){
            await axios.get('/sanctum/csrf-cookie');
        },

        async register(props){
            this.errors = [];
            await this.csrf();
            await axios.post('/register', props).then((response)=>{
                console.log(response);
            })
            .catch(error => {
               // console.log(error);
                if (error.response.status == 422){
                    for( const key in error.response.data.errors){
                        this.errors.push(error.response.data.errors[key][0] + ' ');
                    }
                    console.log(this.errors);
                }
            });
        }

    },


})