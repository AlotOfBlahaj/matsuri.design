<template>
    <div class="root"
         style="background: url('../bg.webp') 0 0 / cover no-repeat fixed;">
        <NavMenu></NavMenu>
        <Jumbotron :user="currentUser"></Jumbotron>
        <VideoList></VideoList>
    </div>
</template>

<script>
    import NavMenu from "@/components/NavMenu";
    import VideoList from "@/components/VideoList";
    import Jumbotron from "@/components/Jumbotron";
    import axios from 'axios'

    export default {
        components: {
            NavMenu: NavMenu,
            VideoList: VideoList,
            Jumbotron: Jumbotron
        },
        data() {
            return {
                users: [],
                currentUser: ''
            }
        },
        methods: {
            getUserList() {
                axios.get('user.json').then(response => {
                    this.users = response.data;
                    this.getCurrentUserDisplayName()
                });
            },
            getCurrentUserDisplayName() {
                const url_user = this.$route.query.user;
                let user = '';
                if (url_user === undefined) {
                    user = 'natsuiromatsuri'
                } else {
                    user = url_user
                }
                const userOB = this.users.find(function (value) {
                    if (value['route'] === user) {
                        return value.displayName
                    }
                });
                this.currentUser = userOB['displayName']
            }
        },
        created() {
            this.getUserList()
        },
        watch: {
            $route: 'getCurrentUserDisplayName'
        }
    };
</script>

<style>
    .root{
        padding-bottom: 16px;
    }
</style>
