<script setup>
    import axios from 'axios';
    import BaseInput from '../components/BaseInput.vue';
    import { reactive } from 'vue';
    import { useUserStore } from '@/stores/user.js'
    import { useRouter } from 'vue-router';

    const form = reactive({
        name: '',
        email: '',
        password: '',
    })

    /*
    const submit = async () => {
        console.log(form);
        await axios.get('/sanctum/csrf-cookie');

        await axios.post('/register', form)
        .then( response =>{
            console.log(response);
            if (response.status == 201){
                alert(response.data.message);
            }
        })
        .catch(error  => {
           
            switch (error.response.status){
                case 422:
                    errors = error.response.data.errors;
                    
                break;
            }
        })
    }
    */

    
    const user = useUserStore();

    const submit = () =>{
        user.register(form);

    }

</script>


<template>

    <div class="page page-center">
        <div class="container-tight py-4">
            <div class="text-center mb-4">
            <a href="." class="navbar-brand navbar-brand-autodark"><img src="@/assets/static/logo.svg" height="36" alt=""></a>
            </div>
            <form @submit.prevent="submit" class="card card-md" action="." method="post">
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Create new account</h2>

                <div v-if="user.getErrors.length" class="alert alert-danger" role="alert">
                    <p v-for="error in user.getErrors"> {{ error }}</p>
                </div>

                <div class="mb-3">
                    <BaseInput v-model="form.name" label="Name" type="text"/>
                </div>

                <div class="mb-3">
                    <BaseInput v-model="form.email" label="Email address" type="email"/>
                </div>

                <div class="mb-3">
                    <BaseInput v-model="form.password" label="Password" type="password"/>
                </div>
            
                <div class="form-footer">
                    <button type="submit" class="btn btn-primary w-100">Create new account</button>
                </div>

            </div>
            </form>

            <div class="text-center text-muted mt-3">
                Already have account? 
                <router-link to="/login">   Sign in    </router-link>
            </div>

        </div>
    </div>


</template>