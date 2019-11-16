<template>
    <div>
        <video class="video-js vjs-default-skin" controls id="my-video">
            <source :src=src type="application/x-mpegURL">
        </video>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import videojs from 'video.js'
    import 'videojs-contrib-hls'

    export default {
        name: "VideoPlayer",
        props: ['src'],
        data() {
            return {
                player: ''
            }
        },
        mounted() {
            this.player = videojs('my-video', {
                bigPlayButton: false,
                textTrackDisplay: false,
                posterImage: false,
                errorDisplay: true,
                controlBar: true
            }, function () {
                this.play()
            })
        },
        beforeDestroy: function () {
            // console.log('dispose');
            this.player.dispose();
        }
    }

</script>

<style scoped>
</style>