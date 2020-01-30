<template>
    <div v-if="loaded">

        <!--        <b-nav class="navbar-light nav-video-list card-blur">-->
        <!--            <b-nav-item @click="updateData()">视频列表</b-nav-item>-->
        <!--            <b-nav-item-dropdown boundary text="日期">-->
        <!--                <b-dropdown-item :key="date" @click="filter_by_date(date)" v-for="date in Dates">{{date}}-->
        <!--                </b-dropdown-item>-->
        <!--            </b-nav-item-dropdown>-->
        <!--        </b-nav>-->

        <div class="my-card-column">
                <b-card :footer="video.Date" class="card-blur" :key="video.Title" v-for="video in ShowVideos">
                    <b-card-text><a :href="video.originTarget">{{video.Title}}</a></b-card-text>
                    <div class="div-button">
                        <b-button :href="video.Link" @click="tracking(video.Title)"
                                  v-if="video.Link" variant="info">下载视频
                        </b-button>
                        <b-button :href="video.Link" disabled v-else variant="warning">暂无视频</b-button>
                        <b-button :href="video.Record" v-if="video.Record" variant="primary">同传记录</b-button>
                        <b-button :href="video.Record" disabled v-else>暂无同传</b-button>
                        <b-button :href="video.ASS" v-if="video.ASS" variant="primary">ASS字幕文件</b-button>
                        <b-button :href="video.Record" disabled v-else>暂无ASS字幕</b-button>
                        <b-button @click="set_online_video(video, video.Title)" v-b-modal="'video'"
                                  v-if="video.Link.indexOf('b2.matsuri') !== -1"
                                  variant="warning">
                            在线观看
                        </b-button>
                    </div>
                </b-card>
        </div>
        <b-modal centered id="video" ok-only size="xl" title="在线播放">
            <VideoPlayer :src="online_video"
                         v-if="online_video.indexOf('m3u8') !== -1 || online_video.indexOf('.ts') !== -1"></VideoPlayer>
            <PlyrPlayer :src="online_video" v-else-if="online_video.indexOf('.mp4') !== -1"></PlyrPlayer>
            <FlvPlayer :src="online_video" v-else></FlvPlayer>
        </b-modal>

            <b-pagination-nav
                    class="card-blur nav-bottom"
                    :link-gen="linkGen"
                    :number-of-pages="Math.ceil(Count/12)"
                    align="center"
                    limit="7"
                    use-router
            ></b-pagination-nav>

    </div>
    <div style="text-align: center" v-else>
        <b-spinner variant='primary'>
        </b-spinner>
    </div>

</template>

<script>
    const VideoPlayer = () => import ("./VideoPlayer");
    import axios from "axios";

    const FlvPlayer = () => import ("./FlvPlayer");
    const PlyrPlayer = () => import("./PlyrPlayer");
    export default {
        components: {FlvPlayer, VideoPlayer, PlyrPlayer},
        data() {
            return {
                Videos: [],
                Count: undefined,
                loaded: false,
                // Dates: [],
                online_video: '',
            };
        },
        created() {
            this.updateData();
            // this.getDateList();
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
            set_online_video(video, title) {
                if (video.Link.indexOf(".mp4") !== -1) {
                    this.online_video = video.Link;
                } else {
                    this.online_video = video.M3U8;
                }
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
                            limit: 12,
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
                    ? (this.$route.query.page - 1) * 12
                    : 0;
                return offset;
            }

        },
        watch: {
            $route: function () {
                this.updateData();
                // this.getDateList();
            }
        }
    };
</script>

<style>
    .div-button {
        margin: 0 auto;
        width: fit-content;
    }

    .div-button .btn {
        margin: 0 4px;
        border-radius: 0;
        box-shadow: 0 0 2px 0 #00000033;
    }

    .my-card-column{
        position: relative;
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .card-blur,.card-blur .dropdown-menu{
        background-color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(3px) grayscale(50%) ;
        border-radius: 0;
        border: none;
        box-shadow: 0 0 3px 0 #00000033;
    }

    .card{
        margin: 8px;
        flex-basis: 575px;
        flex-shrink: 1;
        flex-grow: 1;
    }

    .card-body{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .nav-video-list{
        margin: 0 16px;
        width: fit-content;
        position: relative;
        z-index: 1;
    }

    .nav-video-list a{
        color: #000000AA;
    }

    .dropdown-menu{
        max-height: 50vh;
        overflow: auto;
        background-color: #FFFFFFDD!important;
    }

    .dropdown-menu::-webkit-scrollbar {display: none;}

    .pagination{
        margin-bottom: 0;
    }
    .page-link,.page-item.disabled .page-link{
        background: none;
        border: none;
        margin-left: 0;
        color: #000000DD;
    }
    .page-link:hover{
        z-index: 0;
        color: #0056b3;
        text-decoration: none;
        background-color: #FFFFFFEE;
    }

    .nav-bottom{
        margin: 0 16px;
    }

</style>