<template>
    <div>
        <b-container>
            <b-form @submit="onSubmit">
                <b-form-group :state="state(form.name)" id="user" label="用户名">
                    <b-form-input :state="state(form.name)" id="name" placeholder="(用户名)"
                                  v-model="form.name"></b-form-input>
                </b-form-group>
                <b-form-group :state="state(form.comment)" id="comment">
                    <b-form-textarea :state="state(form.comment)" id="name" max-rows="5"
                                     no-resize placeholder="(发表评论)" rows="5" v-model="form.comment"></b-form-textarea>
                </b-form-group>
                <b-button id="button" type="submit" variant="primary">提交</b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "CommentForm",
        methods: {
            state(value) {
                return value.length > 0
            },
            onSubmit(evt) {
                evt.preventDefault();
                let data = JSON.stringify(this.form);
                axios
                    .post("https://matsuri.design/api/comment", {
                        data
                    })
                    .then(response => ((this.result = response.data.result), alert('已提交评论，请刷新页面' + this.result)));
            }
        },
        data() {
            return {
                form:
                    {
                        name: '',
                        comment: ''
                    },
                result: ''
            }
        }
    }
</script>

<style scoped>
    #user {
        width: 25%;
    }
</style>