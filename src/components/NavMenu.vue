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
                    <b-nav-item to="/extra/add">补充录播和留言板</b-nav-item>
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
                axios.get('user.json').then(
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
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: -3px -5px 11px 9px rgba(0, 0, 0, 0.75);
    }
</style>