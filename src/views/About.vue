<template>
    <div>
        <NavMenu></NavMenu>
        <Jumbotron></Jumbotron>
        <b-container>
            <b-row><h2>如果您对使用本站有任何疑问和建议或缺失存档希望补充，请加入QQ群提供反馈</h2></b-row>
            <b-row><h2>QQ群： 992556096</h2></b-row>
            <h3 style="text-align: end">作者：FZxiao</h3>
            <h3 style="text-align: end">2020/01/30</h3>
        </b-container>
    </div>
</template>

<script>
    import NavMenu from "../components/NavMenu";

    const Jumbotron = () => (import("../components/Jumbotron"));

    export default {
        components: {
            NavMenu,
            Jumbotron
        }
    }
</script>

<style>

</style>