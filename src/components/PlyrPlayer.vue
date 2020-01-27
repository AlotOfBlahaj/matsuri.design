<template>
    <div>
        <vue-plyr>
            <video id="my-video">
                <source :src="src">
                <!--                <source src="https://f000.backblazeb2.com/file/matsuri/%E3%80%90Minecraft%E3%80%91%E5%9C%B0%E4%B8%8B%E3%81%AB%E3%81%B2%E3%81%8D%E3%81%93%E3%82%82%E3%82%8A%E3%81%BE%E3%81%99%E3%83%83%EF%BC%81%EF%BC%81%E5%AF%9D%E3%82%8C%E3%82%8B%E3%81%BE%E3%81%A3%E3%81%9F%E3%82%8A%E4%BD%9C%E6%A5%AD%E6%9E%A0%EF%BD%9E%E3%80%90%E3%83%9B%E3%83%AD%E3%83%A9%E3%82%A4%E3%83%96%23%E5%A4%8F%E8%89%B2%E3%81%BE%E3%81%A4%E3%82%8A%E3%80%91.mp4">-->
            </video>
        </vue-plyr>
    </div>
</template>

<script>
    export default {
        name: "PlyrPlayer",
        props: ["src"],
    }
</script>
<style scoped>
    #my-video {
        max-width: 100%;
        max-height: 100%;
    }
</style>