<template>
  <div v-if="loaded">
    <b-card-group columns>
      <div v-for="video in Videos" :key="video.Title">
        <b-card :footer="video.Date">
          <b-card-text>{{ video.Title }}</b-card-text>
          <div id="div-button">
            <b-button :href="video.Link" id="Button" variant="info" v-if="video.Link">下载视频</b-button>
            <b-button disabled :href="video.Link" id="Button" variant="warning" v-else>暂无视频</b-button>
            <b-button :href="video.Record" id="Button" variant="primary" v-if="video.Record">同传记录</b-button>
            <b-button disabled :href="video.Record" id="Button" v-else>暂无同传</b-button>
          </div>
        </b-card>
      </div>
    </b-card-group>
    <div class="overflow-auto">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="Math.ceil(Count/9)"
        use-router
        align="center"
        limit="7"
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Videos: [],
      Count: undefined,
      loaded: false,
      Fields: [
        {
          key: "Image",
          label: "封面"
        },
        {
          key: "Title",
          label: "视频名称"
        },
        {
          key: "Date",
          label: "日期"
        },
        {
          key: "Link",
          label: "视频下载"
        },
        {
          key: "Record",
          label: "同传记录"
        }
      ]
    };
  },
  created() {
    this.updateData();
  },
  methods: {
    linkGen(pageNum) {
      if (this.$route.query.user != undefined) {
        return pageNum === 1
          ? `?user=${this.$route.query.user}`
          : `?user=${this.$route.query.user}&page=${pageNum}`;
      } else {
        return pageNum === 1 ? "?" : `?page=${pageNum}`;
      }
    },
    updateData: function() {
      this.loaded = false;
      axios
        .get("https://matsuri.design/api/videos", {
          params: {
            count: true,
            offset: this.get_offset(),
            user:
              this.$route.query.user != undefined
                ? this.$route.query.user
                : "natsuiromatsuri"
          }
        })
        .then(
          response => (
            (this.Videos = response.data.VideoList),
            (this.Count = response.data.Count),
            (this.loaded = true)
          )
        );
    },
    get_offset() {
      let offset = this.$route.query.page
        ? (this.$route.query.page - 1) * 9
        : 0;
      return offset;
    }
  },
  watch: {
    $route: "updateData"
  }
};
</script>

<style>
#div-button {
  margin: 0 auto;
  width: fit-content;
}
#Button {
  margin: 12px;
}
</style>