<template lang="">
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container">
            <a class="navbar-brand m-auto" href="index.html">Facegram</a>
        </div>
    </nav>
    
    <main class="mt-5">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                            <h5 class="mb-0">Register</h5>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent='register()'>
                                <div class="mb-3">
                                    <div class="alert alert-danger" v-if="errors.full_name != null">{{errors.full_name[0]}}</div>
                                    <label for="full_name">Full Name</label>
                                    <input type="text" class="form-control" id="full_name" name="full_name" v-model="full_name"/>
                                </div>
    
                                <div class="mb-2">
                                    <div class="alert alert-danger" v-if='errors.username != null'>{{errors.username[0]}}</div>
                                    <label for="username">Username</label>
                                    <input type="text" class="form-control" id="username" name="username" v-model="username"/>
                                </div>
                                
                                <div class="mb-3">
                                    <div class="alert alert-danger" v-if='errors.password != null'>{{errors.password[0]}}</div>
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" name="password" v-model="password"/>
                                </div>
                                
                                <div class="mb-3">
                                    <div class="alert alert-danger" v-if='errors.bio != null'>{{errors.bio[0]}}</div>
                                    <label for="bio">Bio</label>
                                    <textarea name="bio" id="bio" cols="30" rows="3" class="form-control" v-model="bio"></textarea>
                                </div>
    
                                <div class="mb-3 d-flex align-items-center gap-2">
                                    <input type="checkbox" id="is_private" name="is_private" v-model="is_private"/>
                                    <label for="is_private">Private Account</label>
                                </div>
    
                                <button type="submit" class="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
    
                    <div class="text-center mt-4">
                        Already have an account? <a href="/login">Login</a>
                    </div>
    
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'
import router from '@/router'
export default {
    data(){
        return{
            full_name: '',
            username: '',
            password: '',
            bio: '',
            is_private: false,
            errors: {
                'full_name': null,
                'username': null,
                'password': null,
                'bio': null,
            }
        }
    },

    
    methods: {
        register(){
            axios.post('http://localhost:8000/api/v1/auth/register',{
                full_name: this.full_name,
                username: this.username,
                bio : this.bio,
                password : this.password,
                is_private : this.is_private,
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', this.username);
                localStorage.setItem('isLogin', true);
                router.go('/users/', this.username);
            })
            .catch((error) => {
                console.log(error);
                this.errors = error.response.data.errors;
            })
        },

        cekLogin(){
            if(localStorage.getItem('token') != null){
                router.push(`/users/${localStorage.getItem('username')}`);
            }
        },
    },
    

    mounted(){
        this.cekLogin();
    },
}
</script>
<style lang="">
    
</style>