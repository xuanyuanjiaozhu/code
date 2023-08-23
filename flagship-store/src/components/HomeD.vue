<template>
    <div id="Home">
        <div class="header">
            <p class="megInfo-text">
                ********************************************************************************$$$$$$</p>
        </div>
        <div class="content">
            <div class="aside">
                aside
            </div>
            <div class="section">
                <div class="map" id="china-map">
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
    import * as echarts from "echarts"
    import geoJson from "../assets/data/geo3D"
    import coordtransform from "coordtransform"
    // import "../assets/js/map/china"

    export default {
        name: "Home",
        data() {
            return {
                dataIndex: 0,
                mTime: null
            }
        },
        props: {
            msg: String
        },
        methods: {
            convertCoord(coord) {
                const gcj02 = coordtransform.wgs84togcj02(coord[0], coord[1])
                const bd09 = coordtransform.gcj02tobd09(gcj02[0], gcj02[1])
                return bd09
            },
        },
        mounted() {
            var myChart = echarts.init(document.getElementById('china-map'));

            var scatterData = [
                {name: "亚东县", value: "2945米"},
                {name: "仁布县", value: "3950米"},
                {name: "谢通门县", value: "4008米"},
                {name: "萨迦县", value: "4330米"},
                {name: "拉孜县", value: "4012米"},
                {name: "昂仁县", value: "4320米"},
                {name: "江孜县", value: "约4000米"},
                {name: "白朗县", value: "平均4200米"},
                {name: "聂拉木县", value: "4300米"},
                {name: "昂仁县", value: "4320米"},
                {name: "岗巴县", value: "4700米以上"},
                {name: "定结县", value: "2500-4700米"},
                {name: "定日县", value: "平均5000米。"},
                {name: "吉隆县", value: "4200米"},
                {name: "萨嘎县", value: "4487米"},
                {name: "仲巴县", value: "4772米"},
                {name: "南木林县", value: "3790米到4952米"},
                {name: "桑珠孜区", value: "3840米"},
                {name: "康马县", value: "4200-4600米"}

            ];

            // 绘制图表
            let option = {
                // backgroundColor: "#fff",
                tooltip: {
                    // 鼠标是否可以进入悬浮框
                    show: true,
                    confine: true,
                    enterable: true,
                    // 触发方式 mousemove, click, none, mousemove|click
                    triggerOn: 'mousemove',
                    // item 图形触发， axis 坐标轴触发， none 不触发
                    trigger: 'item',
                    // 浮层隐藏的延迟
                    hideDelay: 100,
                    // 背景色
                    backgroundColor: 'rgba(110, 110, 110,.5)',
                    formatter: function (params) {
                        const altitudeMap = {
                            '亚东县': '2945米',
                            '仁布县': '3950米',
                            '谢通门县': '4008米',
                            '萨迦县': '4330米',
                            '拉孜县': '4012米',
                            '昂仁县': '4320米',
                            '江孜县': '约4000米',
                            '白朗县': '平均4200米',
                            '聂拉木县': '4300米',
                            '岗巴县': '4700米以上',
                            '定结县': '2500-4700米',
                            '定日县': '平均5000米',
                            '吉隆县': '4200米',
                            '萨嘎县': '4487米',
                            '仲巴县': '4772米',
                            '南木林县': '3790米到4952米',
                            '桑珠孜区': '3840米',
                            '康马县': '4200-4600米',
                        };

                        return `
            <div style="background-color: #ffffff;box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);padding: 20px;border-radius: 5px;font-size: 36px;color: #333;z-index: 1000;border-color:#333">
              <div style="font-weight: bold;margin-bottom: 30px;">${params.name}</div>
              <div>海拔：${altitudeMap[params.name] ? altitudeMap[params.name] : '未知'}</div>
            </div>
          `
                    }
                },
                geo3D: {
                    show: true,
                    map: "centerMap",
                    left: "1%",   //偏移量调整
                    top: "1%",  //偏移量调整
                    roam: true,
                    zoom: 1,
                    regionHeight: 1,
                    label: {
                        show: true,
                        distance: 20,
                        borderRadius: 0,
                        distanca: 0,
                        fontSize: 30,
                        color: "#ffffff", // 地图初始化区域字体颜色
                        borderWidth: 0,
                        borderColor: '#ffffff'
                    },
                    itemStyle: {
                        // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
                        color: "#271f71", // 地图板块的颜色
                        fontSize: 30,
                        opacity: 1, // 图形的不透明度 [ default: 1 ]
                        borderWidth: 10, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
                        borderColor: "#6a63f4", // 图形描边的颜色。[ default: #333 ]
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: "#000000", //悬浮字体颜色
                            fontSize: 38,
                        },
                        itemStyle: {
                            color: "#e2e1e1",
                            opacity: 1,
                        },
                    },
                    // shading: "color",
                    light: {
                        // 光照阴影
                        main: {
                            color: "#FFFFFF", // 光照颜色
                            intensity: 2, // 光照强度
                            shadowQuality: "light", // 阴影亮度
                            shadow: true, // 是否显示阴影
                            alpha: 50,
                            beta: 10,
                        },
                    },
                    regions: [],
                    viewControl: {
                        "projection": "perspective",
                        "autoRotate": false,
                        "autoRotateAfterStill": 3,
                        "distance": 100.1931248935421,  //默认比例
                        "alpha": 83.592048936336816,
                        "beta": 0.48683006219769,
                        "minAlpha": 5,
                        "maxAlpha": 40,
                        "minBeta": -1036800,
                        "maxBeta": 1036800,
                        "animation": true,
                        "animationDurationUpdate": 1000,
                        "animationEasingUpdate": "cubicInOut",
                        "orthographicSize": 60,
                        "autoRotateDirection": "cw",
                        "autoRotateSpeed": 10,
                        "damping": 0.8,
                        "rotateSensitivity": 1,
                        "zoomSensitivity": 1,
                        "panSensitivity": 1,
                        "panMouseButton": "middle",
                        "rotateMouseButton": "left",
                        "minDistance": 40,
                        "maxDistance": 400,
                        "maxOrthographicSize": 400,
                        "minOrthographicSize": 20,
                        "center": [
                            0,
                            0,
                            0, 0
                        ]
                    },
                },
                series: [
                    {
                        type: "map3D", // 加载series数据
                        seriesIndex: 0, // 第一个系列

                        map: "centerMap",
                        regionHeight: 0,
                        boxHeight: 500,
                        // left: 0,
                        left: "4%",   //偏移量调整
                        top: "5%",  //偏移量调整
                        itemStyle: {
                            // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
                            color: "rgba(37, 37, 38,1)", // 地图板块的颜色
                            opacity: 0, // 图形的不透明度 [ default: 1 ]
                            borderWidth: 0, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
                            borderColor: "#69E8F5", // 图形描边的颜色。[ default: #333 ]
                        },

                        label: {
                            show: true,
                            color: "#FFFFFF",
                        },
                        regions: [],
                        zlevel: 5,
                        viewControl: {
                            "projection": "perspective",
                            "autoRotate": false,
                            "autoRotateAfterStill": 3,
                            "distance": 100.1931248935421,  //默认比例
                            "alpha": 83.592048936336816,
                            "beta": 0.48683006219769,
                            "minAlpha": 5,
                            "maxAlpha": 40,
                            "minBeta": -1036800,
                            "maxBeta": 1036800,
                            "animation": true,
                            "animationDurationUpdate": 1000,
                            "animationEasingUpdate": "cubicInOut",
                            "orthographicSize": 60,
                            "autoRotateDirection": "cw",
                            "autoRotateSpeed": 10,
                            "damping": 0.8,
                            "rotateSensitivity": 1,
                            "zoomSensitivity": 1,
                            "panSensitivity": 1,
                            "panMouseButton": "middle",
                            "rotateMouseButton": "left",
                            "minDistance": 40,
                            "maxDistance": 400,
                            "maxOrthographicSize": 400,
                            "minOrthographicSize": 20,
                            "center": [
                                0,
                                -5,
                                0,
                            ]
                        },
                    },
                    {
                        type: "scatter3D",

                        coordinateSystem: "geo3D",
                        data: [],
                        symbol: "pin",
                        symbolSize: 20,
                        animation: true,
                        animationDurationUpdate: 500,
                        geo3DIndex: 0,
                        silent: false,
                        itemStyle: {
                            opacity: 1,
                            width: 1,
                        },
                        shading: "lambert",
                        label: {
                            show: false,
                            position: "right",
                            distance: 200, // 距离图形元素的距离
                            color: "#ff0000",
                            backgroundColor: "rgba(255, 255, 255, 0)",
                            rich: {
                                get: {
                                    color: "#00E3FF",
                                    lineHeight: 2,
                                },
                                set: {
                                    color: "#FFF100",
                                    lineHeight: 2,
                                },
                                date11: {
                                    color: "#FFFFFF",
                                    lineHeight: 2,
                                },
                            },
                            zlevel: 6,
                        },
                        emphasis: {
                            itemStyle: {
                                color: "#FFF200",
                            },
                            label: {
                                show: false,
                            },
                        },
                        zlevel: 6,
                    },
                ],
            };
            // myChart.showLoading();

            echarts.registerMap('centerMap', geoJson);
            // myChart.hideLoading();

            var mapFeatures = echarts.getMap("centerMap").geoJson.features;
            var geoCoordMap = {};
            mapFeatures.forEach(function (v) {
                // v.properties.center = _this.convertCoord(v.properties.center)
                // 地区名称
                var name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.center;


            });
            let currentIdx = -1;

            function highlightNext() {
                if (currentIdx++ >= 0) {
                    // 防止下标增加到超过区域数组长度
                    currentIdx %= mapFeatures.length;
                }
                highlightRegion(currentIdx) // 此处的currentIdx经过if判断，已经+1了
                setTimeout(highlightNext, 5000);
            }

            function highlightRegion(index) { // 高亮地图区域，改变对应的散点样式
                let regionName = mapFeatures[index].properties.name; // 高亮的区名

                option.geo3D.regions = [ // 高亮3D地图对应的区块
                    {
                        name: regionName,
                        label: {
                            show: true,
                            color: "##000000",
                        },
                        itemStyle: {
                            color: "#ffffff",
                            opacity: 1,
                        }
                    }
                ];

                // 当前高亮区域有散点，需删除stroke动效中的该条数据并在fill动效中增加该条数据
                option.series[0].data = scatterData.filter(item => item.name !== regionName); // stroke散点数据
                option.series[1].data = scatterData.filter(item => item.name === regionName); // fill散点数据

                myChart.setOption(option);
                myChart.dispatchAction({ // 触发散点高亮事件，改变标签样式
                    type: 'showTip',
                    seriesIndex: 1, // series中的第二个图层（fill散点图层）
                    dataIndex: 0 // 高亮第一条数据，由于fill散点图层只有一条数据，这里可以不指定
                });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                // 显示弹框
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                // myChart.on('mouseover', () => {
                //   console.log('mouseover')
                //   // 停止定时器，清除之前的高亮
                //   clearInterval(this.mTime)
                //   this.mTime = ''
                //   myChart.dispatchAction({
                //     type: 'downplay',
                //     seriesIndex: 0,
                //     dataIndex: this.dataIndex
                //   })
                // })
            }


            myChart.setOption(option);
            highlightNext()


            // this.mapActive(myChart)

        }
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

        .megInfo-text {
            min-width: 100%;
            margin: 0;
            padding: 0 0 4px;
            color: #FFFFFF;
            display: inline-block;
            white-space: nowrap;
            animation: 50s wordsLoop linear infinite normal;
            cursor: default;
        }

        .megInfo-text:hover {
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
