<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">夏色まつり Unoffical</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">单推祭</b-nav-item>
          <b-nav-item-dropdown text="我要DD">
            <b-dropdown-item to="/?user=uruharushia">潤羽るしあ</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/extra/add">补充录播和留言板</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>