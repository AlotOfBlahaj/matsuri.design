<template>
    <div>
        <comment-form></comment-form>
        <comment-area></comment-area>
    </div>
</template>

<script>
    import CommentArea from "./CommentArea";
    import CommentForm from "./CommentForm";

    export default {
        name: "Comment",
        components: {
            CommentArea: CommentArea,
            CommentForm: CommentForm
        }
    }
</script>

<style scoped>

</style>