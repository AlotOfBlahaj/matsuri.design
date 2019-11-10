<template>
    <div>
        <b-container>
            <b-row><h4>留言板</h4></b-row>
            <b-list-group>
                <b-list-group-item :key="comment.Comment" class="comment" v-for="comment in commentList">
                    <h5 class="comment-author">{{comment.User}}:</h5>
                    <p class="comment-text">{{comment.Comment}}</p>
                    <p class="comment-date">发表于{{comment.Date}}</p>
                </b-list-group-item>
            </b-list-group>
        </b-container>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "CommentArea",
        data() {
            return {
                commentList: []
            }
        },
        methods: {
            getComment() {
                axios
                    .get("https://matsuri.design/api/comment", {
                        params: {
                            limit: 100,
                            offset: 0
                        }
                    })
                    .then(response => ((this.commentList = response.data.comment_list)));
            }
        },
        created() {
            this.getComment()
        }
    }
</script>

<style scoped>
    p {
        margin-bottom: 0;
    }

    .comment-author {
        color: #007bff;
    }

    .comment-text {
        margin-left: 2%;
    }

    .comment-date {
        float: right;
        color: darkgrey;
    }
</style>