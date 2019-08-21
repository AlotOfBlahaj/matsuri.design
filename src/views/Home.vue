<template>
  <div>
    <NavMenu></NavMenu>
    <Jumbotron></Jumbotron>
    <VideoList></VideoList>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import VideoList from "@/components/VideoList";
import Jumbotron from "@/components/Jumbotron";

export default {
  components: {
    NavMenu: NavMenu,
    VideoList: VideoList,
    Jumbotron: Jumbotron
  }
};
</script>

<style>
</style>