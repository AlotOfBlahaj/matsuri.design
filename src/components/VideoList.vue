<template>
  <div v-if="loaded">
    <div>
  <b-nav>
    <b-nav-item @click="updateData()">视频列表</b-nav-item>
    <b-nav-item-dropdown text="日期">
      <b-dropdown-item v-for="date in Dates" :key="date" @click="filter_by_date(date)">{{date}}</b-dropdown-item>
    </b-nav-item-dropdown>
  </b-nav>
</div>
    <b-card-group columns>
      <div v-for="video in ShowVideos" :key="video.Title">
        <b-card :footer="video.Date">
          <b-card-text>{{ video.Title }}</b-card-text>
          <div id="div-button">
            <b-button :href="video.Link" id="Button" variant="info" v-if="video.Link">下载视频</b-button>
            <b-button disabled :href="video.Link" id="Button" variant="warning" v-else>暂无视频</b-button>
            <b-button :href="video.Record" id="Button" variant="primary" v-if="video.Record">同传记录</b-button>
            <b-button disabled :href="video.Record" id="Button" v-else>暂无同传</b-button>
            <b-button :href="video.ASS" id="Button" variant="primary" v-if="video.ASS" >ASS字幕文件</b-button>
            <b-button disabled :href="video.Record" id="Button" v-else>暂无ASS字幕</b-button>
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
  <div style="text-align: center" v-else>
    <b-spinner variant='primary'>
    </b-spinner>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Videos: [],
      Count: undefined,
      loaded: false,
      Dates: [],
    };
  },
  created() {
    this.updateData();
    this.getDateList();
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
    filter_by_date(date=undefined) {
      if (date) {
        this.updateData(date)
          }
      else {
        this.ShowVideos = this.Videos
      }
    },
    getDateList() {
      let self = this
      axios
        .get("https://matsuri.design/api/videos", {
          params: {
            user:
              this.$route.query.user != undefined
                ? this.$route.query.user
                : "natsuiromatsuri",
            limit: 0,
            fields: "Date"
          }
        }).then(function (response) {
          for (let video of response.data.VideoList) {
            let date = video.Date.slice(0,11)
            self.Dates.push(date)
          }
          self.Dates = Array.from(new Set(self.Dates))
        }
        )
    },
    updateData: function(filter=undefined) {
      this.loaded = false;
      axios
        .get("https://matsuri.design/api/videos", {
          params: {
            count: true,
            offset: this.get_offset(),
            user:
              this.$route.query.user != undefined
                ? this.$route.query.user
                : "natsuiromatsuri",
            limit: 9,
            filter: filter
          }
        })
        .then(
          response => (
            (this.Videos = response.data.VideoList),
            (this.Count = response.data.Count),
            (this.loaded = true),
            (this.filter_by_date()) 
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