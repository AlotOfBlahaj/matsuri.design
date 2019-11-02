<template>
    <div v-if="loaded">
        <div>
            <b-nav>
                <b-nav-item @click="updateData()">视频列表</b-nav-item>
                <b-nav-item-dropdown boundary text="日期">
                    <b-dropdown-item :key="date" @click="filter_by_date(date)" v-for="date in Dates">{{date}}
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>
        </div>
        <b-card-group columns>
            <div :key="video.Title" v-for="video in ShowVideos">
                <b-card :footer="video.Date" class="f-shadow">
                    <b-card-text>{{ video.Title }}</b-card-text>
                    <div id="div-button">
                        <b-button :href="video.Link" @click="tracking(video.Title)" id="Button"
                                  v-if="video.Link.indexOf('baidu') !== -1" variant="info">百度云
                        </b-button>
                        <b-button :href="video.Link" @click="tracking(video.Title)" id="Button"
                                  v-else-if="video.Link.indexOf('api/s3') !== -1" variant="warning">私有云存储
                        </b-button>
                        <b-button :href="video.Link" disabled id="Button" v-else variant="warning">暂无视频</b-button>
                        <b-button :href="video.Record" id="Button" v-if="video.Record" variant="primary">同传记录</b-button>
                        <b-button :href="video.Record" disabled id="Button" v-else>暂无同传</b-button>
                        <b-button :href="video.ASS" id="Button" v-if="video.ASS" variant="primary">ASS字幕文件</b-button>
                        <b-button :href="video.Record" disabled id="Button" v-else>暂无ASS字幕</b-button>
                        <b-button @click="set_online_video(video.Link, video.Title)" id="Button" v-b-modal="'video'"
                                  v-if="video.Link.indexOf('api/s3') !== -1 && video.Link.indexOf('.flv') !== -1"
                                  variant="warning">
                            在线观看（测试）
                        </b-button>
                    </div>
                </b-card>
            </div>
        </b-card-group>
        <b-modal centered id="video" ok-only size="xl" title="在线播放">
            <VideoPlayer :src="online_video"></VideoPlayer>
        </b-modal>
        <div class="overflow-auto">
            <b-pagination-nav
                    :link-gen="linkGen"
                    :number-of-pages="Math.ceil(Count/9)"
                    align="center"
                    limit="7"
                    use-router
            ></b-pagination-nav>
        </div>
    </div>
    <div style="text-align: center" v-else>
        <b-spinner variant='primary'>
        </b-spinner>
    </div>

</template>

<script>
    import VideoPlayer from "./VideoPlayer";

    export default {
        components: {VideoPlayer},
        data() {
            return {
                Videos: [],
                Count: undefined,
                loaded: false,
                Dates: [],
                online_video: '',
            };
        },
        created() {
            this.updateData();
            this.getDateList();
        },
        methods: {
            tracking(title) {
                this.$ga.event({
                    eventCategory: 'video',
                    eventAction: 'download',
                    eventLabel: title,
                    eventValue: 1
                });
            },
            set_online_video(link, title) {
                this.online_video = link;
                this.$ga.event({
                    eventCategory: 'video',
                    eventAction: 'play',
                    eventLabel: title,
                    eventValue: 1
                });
            },
            linkGen(pageNum) {
                if (this.$route.query.user !== undefined) {
                    return pageNum === 1
                        ? `?user=${this.$route.query.user}`
                        : `?user=${this.$route.query.user}&page=${pageNum}`;
                } else {
                    return pageNum === 1 ? "?" : `?page=${pageNum}`;
                }
            },
            filter_by_date(date = undefined) {
                if (date) {
                    this.updateData(date)
                } else {
                    this.ShowVideos = this.Videos
                }
            },
            getDateList() {
                let self = this;
                axios
                    .get("https://matsuri.design/api/videos", {
                        params: {
                            user:
                                this.$route.query.user !== undefined
                                    ? this.$route.query.user
                                    : "natsuiromatsuri",
                            limit: 0,
                            fields: "Date"
                        }
                    }).then(function (response) {
                        for (let video of response.data.VideoList) {
                            let date = video.Date.slice(0, 11);
                            self.Dates.push(date)
                        }
                        self.Dates = Array.from(new Set(self.Dates))
                    }
                )
            },
            updateData: function (filter = undefined) {
                this.loaded = false;
                axios
                    .get("https://matsuri.design/api/videos", {
                        params: {
                            count: true,
                            offset: this.get_offset(),
                            user:
                                this.$route.query.user !== undefined
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
            $route: function () {
                this.updateData();
                this.getDateList();
            }
        }
    };
</script>

<style>
    #div-button {
        margin: 0 auto;
        width: fit-content;
    }

    #Button {
        margin: 8px;
    }

    .f-shadow {
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: 7px 6px 8px 0 rgba(255, 255, 255, 0.25);
    }
</style>