<template>
    <div>
        <video-js class="vjs-default-skin" controls id="my-video">
            <source :src=src type="application/x-mpegURL">
            <!--            <source src="https://matsuri.design/api/s3?title=%E3%80%90%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%95%E3%82%A3%E3%83%83%E3%83%88%E3%82%A2%E3%83%89%E3%83%99%E3%83%B3%E3%83%81%E3%83%A3%E3%83%BC%E3%80%91%E6%9C%AC%E6%B0%97%E3%83%80%E3%82%A4%E3%82%A8%E3%83%83%E3%83%88%EF%BC%81%EF%BC%81%E5%BC%95%E3%81%8D%E3%81%93%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AF%E9%AC%BC%E7%95%9C%E3%81%99%E3%81%8E%E3%82%8B...%E3%80%90%E3%83%9B%E3%83%AD%E3%83%A9%E3%82%A4%E3%83%96%23%E7%B4%AB%E5%92%B2%E3%82%B7%E3%82%AA%E3%83%B3%E3%80%91.m3u8">-->
        </video-js>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import videojs from 'video.js'
    import '../http-streaming'

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
                controlBar: true,
                fluid: true,
                html5: {
                    hls: {
                        overrideNative: true
                    }
                }
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
    #my-video {
        max-width: 100%;
        max-height: 100%;
    }
</style>