<template>
    <div>
        <video controls id="flv-js"></video>
    </div>
</template>

<script>
    import flvjs from 'flv.js/src/flv'

    export default {
        name: "FlvPlayer",
        props: ['src'],
        data() {
            return {}
        },
        created: function () {
            this.isSupported = flvjs.isSupported();
            this.flvPlayer = flvjs.createPlayer({type: 'flv', url: this.src, isLive: true})
        },
        mounted: function () {
            let videoElement = document.getElementById('flv-js');
            this.flvPlayer.attachMediaElement(videoElement);
            this.flvPlayer.load();
            this.flvPlayer.play();
        },
        beforeDestroy: function () {
            this.flvPlayer.dispose();
        }

    }
</script>

<style scoped>
    #flv-js {
        width: 100%;
        height: 100%;
        margin: 0;
    }
</style>