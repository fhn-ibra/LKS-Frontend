<template lang="">
    <main class="mt-5">
        <div class="container py-5" v-if="user != 'User Not Found'">
            <div class="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                <div>
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <h5 class="mb-0">{{user.full_name == null ? '' : user.full_name}}</h5>
                        <span>@{{user.username == null ? '' : user.username}}</span>
                    </div>
                    <small class="mb-0 text-muted">
                       {{ user.bio == null ? 'Loading..' : user.bio }}
                    </small>
                </div>
                <div>

                    <a href="/post/create" class="btn btn-primary w-100 mb-2" v-if='acc == true'>
                        + Create new post
                    </a>

                    <a href="#" class="btn btn-primary w-100 mb-2" v-if="(acc == false) && (!follow)" @click="follow = !follow">
                        Follow
                    </a>

                    <a href="#" class="btn btn-secondary w-100 mb-2" v-if="(acc == false) && follow" @click="follow = !follow">
                        Following
                    </a>

                    <div class="d-flex gap-3">
                        <div>
                            <div class="profile-label"><b>5</b> posts</div>
                        </div>
                        <div class="profile-dropdown">
                            <div class="profile-label"><b>100</b> followers</div>
                            <div class="profile-list">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@davidnaista</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@superipey</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@lukicenturi</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@_erik3010</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@asawgi</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@irfnmaulaa</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="profile-dropdown">
                            <div class="profile-label"><b>100</b> following</div>
                            <div class="profile-list">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@davidnaista</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@superipey</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@lukicenturi</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@_erik3010</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@asawgi</a>
                                        </div>
                                        <div class="profile-user">
                                            <a href="user-profile-private.html">@irfnmaulaa</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="card-images mb-2">
                                <!-- <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                                <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                                <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/> -->
                            </div>
                            <p class="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="card-images mb-2">
                                <!-- <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                                <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                                <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/> -->
                            </div>
                            <p class="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="card-images mb-2">
                                <!-- <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                                <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                                <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/> -->
                            </div>
                            <p class="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="container py-5" v-if="user == 'User Not Found'">
            <div class="alert alert-danger">{{user}}</div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'
import router from '@/router'


export default {
    data() {
        return {
            user: [],
            token: '',
            acc: 'Lorem'
        }
    },

    setup(){

    },

    mounted() {
        this.cek();
    },

    //Penting
    beforeRouteEnter(to, from, next) {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8000/api/v1/users/${to.params.username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => {
                // console.log(response);
                // this.user = response.data;
                // this.acc = response.data.is_your_account;
                next(vm => {
                vm.user = response.data;
                vm.acc = response.data.is_your_account;
                console.log(response);
            });
            })
            .catch((error) => {
                // this.user = error.response.data.message;
                // console.log(this.user);
                console.log(error);
                next(vm => {
                    vm.user = error.response.data.message;
                })
            })
    },

    methods: {
        cek() {
            this.token = localStorage.getItem('token');
            if (this.token == null) {
                localStorage.clear();
                router.push('/login');
            } else {
                axios.get('http://localhost:8000/api/user', {
                    'headers': {
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                    .then((response) => {

                    })
                    .catch((error) => {

                        localStorage.clear();
                        router.push('/login');
                    })
            }
        }
    },

    
}
</script>
<style lang="">

</style>