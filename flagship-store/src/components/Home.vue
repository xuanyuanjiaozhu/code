<template>
    <div id="Home">
        <div class="header">
            <p class="megInfo-text">rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</p>
        </div>
        <div class="content">
            <div class="aside">
                aside
            </div>
            <div class="section">
                <div class="map">
                    地图
                </div>
                <div class="commodity-data">
                    商品数据
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped lang="scss">
    #Home {
        display: flex;
        flex-direction: column;
        height: 100%;

    }

    .header {
        height: 60px;
        background-color: #1f6feb;
        display: flex;
        align-items: center;
        justify-content: center;

        .megInfo-text{
            min-width: 100%;
            margin: 0;
            padding: 0 0 4px;
            color: #FFFFFF;
            display: inline-block;
            white-space: nowrap;
            animation: 50s wordsLoop linear infinite normal;
            cursor: default;
        }
        .megInfo-text:hover{
            animation-play-state: paused;
            -webkit-animation-play-state: paused;
            -moz-animation-play-state: paused;
        }
        @keyframes wordsLoop {
            0% {
                transform: translateX(100%);
                -webkit-transform: translateX(100%);
            }
            100% {
                transform: translateX(-100%);
                -webkit-transform: translateX(-100%);
            }
        }
        @-webkit-keyframes wordsLoop {
            0% {
                transform: translateX(100%);
                -webkit-transform: translateX(100%);
            }
            100% {
                transform: translateX(-100%);
                -webkit-transform: translateX(-100%);
            }
        }

    }

    .content {
        display: flex;
        flex-grow: 1;

        .aside {
            width: 260px;
            background-color: #00d2d3;
        }

        .section {
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            .map {
                height: 800px;
                background-color: #1e88e5;
            }

            .commodity-data {
                flex-grow: 1;
                background-color: yellow;
            }
        }
    }
</style>
