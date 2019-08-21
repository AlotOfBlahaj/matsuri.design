<template>
  <div>
      <NavMenu></NavMenu>
        <Jumbotron></Jumbotron>
      <QueueForm></QueueForm>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import QueueForm from '@/components/QueueForm';
import Jumbotron from '@/components/Jumbotron';
export default {
    components: {
        QueueForm: QueueForm,
        NavMenu: NavMenu,
        Jumbotron: Jumbotron
    }
}
</script>

<style>

</style>