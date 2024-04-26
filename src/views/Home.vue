<template lang="">
    <main class="mt-5">
        <div class="container py-5">
            <div class="row justify-content-between">
                <div class="col-md-8">
                    <h5 class="mb-3">News Feed</h5>
                    <div class="card mb-4" v-for="post in posts">
                        <!-- {{ post }} -->
                        <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                            <h6 class="mb-0">{{post.users.full_name}}</h6>
                            <small class="text-muted">x days ago</small>
                        </div>
                        <div class="card-body">
                            <div class="card-images mb-2">
                                <img :src="`http://localhost:8000/storage/${image.storage_path}`" alt="image" class="w-100" v-for="image in post.attachments"/>
                            </div>
                            <p class="mb-0 text-muted"><b><a href="user-profile.html">{{post.users.username}}</a></b> {{post.caption}}</p>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-4">
                    <div class="request-follow mb-4">
                        <h6 class="mb-3">Follow Requests</h6>
                        <div class="request-follow-list">
                            <div class="card mb-2">
                                <div class="card-body d-flex align-items-center justify-content-between p-2">
                                    <a href="#">@lorem</a>
                                    <a href="" class="btn btn-primary btn-sm">
                                        Confirm
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="explore-people">
                        <h6 class="mb-3">Explore People</h6>
                        <div class="explore-people-list">

                            <div class="card mb-2" v-for="user in user">
                                <div class="card-body p-2">
                                    <a :href="`/users/${user.username}`">@{{user.username}}</a>
                                </div>
                            </div>


                        </div>
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
            page: 0,
            size: 10,
            posts: [],
            user: []
        }
    },

    beforeRouteEnter (to, from, next) {
        const token = localStorage.getItem('token');
        //Promise = Untuk Request lebih dari 1 dalam bersamaan.
        Promise.all([
            axios.get('http://localhost:8000/api/v1/posts', {
                params: {
                    'page': to.params.page,
                    'size': to.params.size,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            axios.get('http://localhost:8000/api/v1/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        ])

        .then(([a,b]) => {
            console.log(a,b);
            next(vm => {
                vm.page = a.data.page;
                vm.size = a.data.size;
                vm.posts = a.data.posts.data;

                vm.user = b.data.users;
            })
        })

        .catch((error) => {
            console.log(error);
        })
       
    },

    mounted(){
        this.cek(); 
    },

    methods: {
        cek(){
            const token = localStorage.getItem('token');
            if (token == null) {
                localStorage.clear();
                router.push('/login');
            } else {
                axios.get('http://localhost:8000/api/user', {
                    'headers': {
                        'Authorization': `Bearer ${token}`
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
    }
}
</script>
<style lang="">
    
</style>