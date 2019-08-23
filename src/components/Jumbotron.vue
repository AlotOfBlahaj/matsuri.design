<template>
  <div>
    <b-jumbotron header="夏色まつり Unoffical fans" header-level="3">
      <p id="header">这里可以第一时间获取{{user}}的录播，为了方便补档，还存有各位有能同传man的同传记录供参考</p>
      <p id="header">
        本项目已开源
        <a href="https://github.com/fzxiao233/matsuri.design">Github</a>，欢迎各位提供反馈建议
      </p>
      <p>(你醒了，神回，没录</p>
    </b-jumbotron>
  </div>
</template>

<script>
var userMap = {natsuiromatsuri: '祭',
yozoramel: '梅露梅露',
uruharushia: '露西娅'}
export default {
  data(){
    return{
      user: ''
    }
  },
  methods: {
    getUser() {
      const url_user = this.$route.query.user
      if (url_user == undefined) {
        return 'natsuiromatsuri'
      }
      return url_user;
    },
    getDisplayUserName() {
      const url_user = this.getUser()
      const displayName = userMap[url_user]
      this.user = displayName
    }
  },
  watch: {
    $route: 'getDisplayUserName'
  },
  created() {
    this.getDisplayUserName()
  }
};
</script>

<style>
#header {
  font-size: 22px;
}
</style>