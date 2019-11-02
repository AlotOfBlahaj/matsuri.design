<template>
    <div>
        <b-jumbotron class="f-jumbotron" header="夏色まつり Unoffical fans" header-level="3">
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
    export default {
        data() {
            return {}
        },
        props: {
            user: String
        },
    };
</script>

<style>
    #header {
        font-size: 22px;
    }

    .f-jumbotron {
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 0;
        box-shadow: -3px -5px 11px 9px rgba(0, 0, 0, 0.75);
    }
</style>