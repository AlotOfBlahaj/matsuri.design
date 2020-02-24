<template>
    <div>
        <b-navbar class='top-nav' toggleable="lg">
            <b-navbar-brand href="/">夏色まつり Unoffical</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">单推祭</b-nav-item>
                    <b-nav-item-dropdown text="我要DD">
                        <b-dropdown-item :key="user.route" :to="'/?user=' + user.route" v-for="user in users">
                            {{user.displayName}}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="按钮站系列">
                        <b-dropdown-item href="https://natsuiromatsuri.moe">祭按钮</b-dropdown-item>
                        <b-dropdown-item href="https://towa.matsuri.best">Towa按钮</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item to="/extra/about">关于</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                users: []
            }
        },
        methods: {
            getUser() {
                axios.get('/user.json').then(
                    response => (this.users = response.data)
                )
            }
        },
        created() {
            this.getUser()
        }
    };
</script>

<style>
    .top-nav {
        position: relative;
        z-index: 10;
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(3px) grayscale(50%) ;
    }
</style>