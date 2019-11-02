<template>
    <div>
        <NavMenu></NavMenu>
        <Jumbotron></Jumbotron>
        <Comment></Comment>
        <QueueForm></QueueForm>
    </div>
</template>

<script>
    import NavMenu from "../components/NavMenu";
    import QueueForm from '../components/QueueForm';
    import Jumbotron from '../components/Jumbotron';
    import Comment from "../components/Comment";

    export default {
        components: {
            QueueForm: QueueForm,
            NavMenu: NavMenu,
            Jumbotron: Jumbotron,
            Comment: Comment
        }
    }
</script>

<style>

</style>