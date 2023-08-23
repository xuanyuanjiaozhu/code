<template>
    <div id="Home">
        <div class="header">
            <div class="time-weather">
                <p class="timeBox">2023年07月14日</p>、
                <p class="timeBox"> 11:02:00 星期三</p>
            </div>
            <div class="data-time">
                <dl>
                    <dt>连锁药店数量</dt>
                    <dd>10323</dd>
                </dl>
                <dl>
                    <dt>输注无忧特约中心</dt>
                    <dd>723</dd>
                </dl>
                <dl>
                    <dt>惠民保履约药店</dt>
                    <dd>9331</dd>
                </dl>
                <dl>
                    <dt>双通道定点药店</dt>
                    <dd>6632</dd>
                </dl>

            </div>

        </div>
        <!--        <div class="content">-->
        <div class="map" id="china-map">
            地图
        </div>
        <div class="qr-code-data">
            <dl class="day-data">
                <dt>今日服务患者</dt>
                <dd>2345</dd>
            </dl>
            <div class="rq-code">
                <img src="../assets/img/qr_code.png" alt="">
            </div>

        </div>
        <div class="commodity-data">

            <div class="HOT-SPOT">
                <div class="title">热点关注</div>
                <div class="content">
                    <div class="scroll_list" :style="{transform: `translate(0px,-${scrollTopH}px)`}">
                        <div ref="scrollItemBoxH" class="scrollItemBox">
                            <div class="img-box" v-for="item in logo" :key="item+'ts'">

                                <img src="../assets/img/hot.jpg" alt="">
                            </div>
                        </div>
                        <div v-html="copyHtmlH"></div>
                    </div>
<!--                    <img src="../assets/img/hot.jpg" alt="">-->
                </div>
            </div>
            <div class="service-ability">
                <div class="title">服务能力</div>
                <div class="data-box">
                    <dl>
                        <dt>合作制药企业</dt>
                        <dd>150+</dd>
                    </dl>
                    <dl>
                        <dt>特药品种数量</dt>
                        <dd>1100+</dd>
                    </dl>
                </div>
                <div class="log-box">
                    <div class="log-box-item">
                        <div class="scroll_list" :style="{transform: `translate(-${scrollTop}px,0px)`}">
                            <div ref="scrollItemBox" class="scrollItemBox">
                                <div class="img-box" v-for="item in logo" :key="item+'t'">

                                    <img src="../assets/img/logo_9.png" alt="">
                                </div>
                            </div>
                            <div class="scrollItemBox" v-html="copyHtml"></div>
                        </div>

                    </div>
                    <div class="log-box-item">
                        <div class="scroll_list" :style="{transform: `translate(-${scrollTop}px,0px)`}">
                            <div  class="scrollItemBox">
                                <div class="img-box" v-for="item in logo" :key="item+'t'">

                                    <img src="../assets/img/logo_9.png" alt="">
                                </div>
                            </div>
                            <div class="scrollItemBox" v-html="copyHtml"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!--        </div>-->
    </div>
</template>

<script>
    import * as echarts from "echarts"
    import "../assets/js/map/china"

    export default {
        name: "Home",
        data() {
            return {

                logo: 12,
                speed:50,//滚动速度
                scrollTop: 0,//列表滚动高度
                copyHtml: '',//复制多一份防止滚动到后边出现空白H
                speedH:50,//滚动速度
                scrollTopH: 0,//列表滚动高度
                copyHtmlH: '',//复制多一份防止滚动到后边出现空白H
            }
        },
        methods: {

            initScroll() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.copyHtml = this.$refs.scrollItemBox.innerHTML
                        this.startScroll()
                    }, 200);
                })

            },
            // 鼠标移入停止滚动
            Enter() {
                // clearInterval(this.timerC)};
            },
            // 鼠标移出继续滚动
            Leave() {
                // this.startscro11()
            },
            // 开始滚动
            startScroll() {
                clearInterval(this.timerC)
                this.timerC = setInterval(this.scroll, this.speed);
            },
            // 滚动处理方法
            scroll() {
                this.scrollTop++
                // 获取需要滚动的盒子的高度
                let scrollItemBox = this.$refs.scrollItemBox.offsetWidth// 当判断滚动的高度大于等于盒子高度时，从头开始滚动
                if (this.scrollTop >= scrollItemBox) {
                    this.scrollTop = 0
                }
            },

            initScrollH() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.copyHtmlH = this.$refs.scrollItemBoxH.innerHTML
                        this.startScrollH()
                    }, 200);
                })

            },
            // 鼠标移入停止滚动
            EnterH() {
                // clearInterval(this.timerH)};
            },
            // 鼠标移出继续滚动
            LeaveH() {
                // this.startScrollH()
            },
            // 开始滚动
            startScrollH() {
                clearInterval(this.timerH)
                this.timerH = setInterval(this.scrollH, this.speedH);
            },
            // 滚动处理方法
            scrollH() {
                this.scrollTopH++
                // 获取需要滚动的盒子的高度
                let scrollItemBox = this.$refs.scrollItemBoxH.offsetHeight// 当判断滚动的高度大于等于盒子高度时，从头开始滚动
                if (this.scrollTopH >= scrollItemBox) {
                    this.scrollTopH = 0
                }
            }
        },

        mounted() {

            this.initScroll();
            this.initScrollH();

            // 金额转换万字单位 start
            function unitConvert(num) {
                if (num) {
                    var moneyUnits = ["", "万"],
                        dividend = 10000,
                        curentNum = num, //转换数字
                        curentUnit = moneyUnits[0]; //转换单位
                    for (var i = 0; i < 2; i++) {
                        curentUnit = moneyUnits[i];
                        if (strNumSize(curentNum) < 5) {
                            return num;
                        }
                    }
                    curentNum = curentNum / dividend;
                    var m = {
                        num: 0,
                        unit: ""
                    }
                    m.num = curentNum.toFixed(2);
                    m.unit = curentUnit;
                    return m.num + m.unit;
                }
            }

            function strNumSize(tempNum) {
                var stringNum = tempNum.toString()
                var index = stringNum.indexOf(".")
                var newNum = stringNum
                if (index != -1) {
                    newNum = stringNum.substring(0, index)
                }
                return newNum.length;
            }

            // 金额转换万字单位 end
            var myChart = echarts.init(document.getElementById('china-map'));
            // var oBack = document.getElementById("back");

            var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];
            var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];
            // 全国省份数据
            var toolTipData = [
                {
                    "provinceName": "北京",
                    "provinceKey": 110000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 58,
                    "totalPrice": 860448.7,
                    "orderCount": 31744,
                    "onlineCount": 0
                }, {
                    "provinceName": "天津",
                    "provinceKey": 120000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 74,
                    "totalPrice": 697438.3,
                    "orderCount": 30025,
                    "onlineCount": 0
                }, {
                    "provinceName": "河北",
                    "provinceKey": 130000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 175,
                    "totalPrice": 1051461.5,
                    "orderCount": 50625,
                    "onlineCount": 0
                }, {
                    "provinceName": "山西",
                    "provinceKey": 140000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 73,
                    "totalPrice": 432680.2,
                    "orderCount": 20427,
                    "onlineCount": 0
                }, {
                    "provinceName": "内蒙古",
                    "provinceKey": 150000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 46,
                    "totalPrice": 379952.5,
                    "orderCount": 14585,
                    "onlineCount": 0
                }, {
                    "provinceName": "辽宁",
                    "provinceKey": 210000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 74,
                    "totalPrice": 543290.6,
                    "orderCount": 27143,
                    "onlineCount": 0
                }, {
                    "provinceName": "吉林",
                    "provinceKey": 220000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 25,
                    "totalPrice": 234353.7,
                    "orderCount": 11123,
                    "onlineCount": 0
                }, {
                    "provinceName": "黑龙江",
                    "provinceKey": 230000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 25,
                    "totalPrice": 152894.8,
                    "orderCount": 6481,
                    "onlineCount": 0
                }, {
                    "provinceName": "上海",
                    "provinceKey": 310000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 78,
                    "totalPrice": 665877.5,
                    "orderCount": 26753,
                    "onlineCount": 0
                }, {
                    "provinceName": "江苏",
                    "provinceKey": 320000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 475,
                    "totalPrice": 3302139.4,
                    "orderCount": 158180,
                    "onlineCount": 0
                }, {
                    "provinceName": "浙江",
                    "provinceKey": 330000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 332,
                    "totalPrice": 2285259.3,
                    "orderCount": 116344,
                    "onlineCount": 0
                }, {
                    "provinceName": "安徽",
                    "provinceKey": 340000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 168,
                    "totalPrice": 1081322.1,
                    "orderCount": 57139,
                    "onlineCount": 0
                }, {
                    "provinceName": "福建",
                    "provinceKey": 350000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 145,
                    "totalPrice": 1352019.8,
                    "orderCount": 65228,
                    "onlineCount": 0
                }, {
                    "provinceName": "江西",
                    "provinceKey": 360000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 103,
                    "totalPrice": 689353.7,
                    "orderCount": 31822,
                    "onlineCount": 0
                }, {
                    "provinceName": "山东",
                    "provinceKey": 370000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 198,
                    "totalPrice": 1177320.9,
                    "orderCount": 59966,
                    "onlineCount": 0
                }, {
                    "provinceName": "河南",
                    "provinceKey": 410000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 184,
                    "totalPrice": 953710.6,
                    "orderCount": 52829,
                    "onlineCount": 0
                }, {
                    "provinceName": "湖北",
                    "provinceKey": 420000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 125,
                    "totalPrice": 890921.4,
                    "orderCount": 46768,
                    "onlineCount": 0
                }, {
                    "provinceName": "湖南",
                    "provinceKey": 430000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 111,
                    "totalPrice": 1007182.7,
                    "orderCount": 44094,
                    "onlineCount": 0
                }, {
                    "provinceName": "广东",
                    "provinceKey": 440000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 384,
                    "totalPrice": 3792306.1,
                    "orderCount": 165774,
                    "onlineCount": 0
                }, {
                    "provinceName": "广西",
                    "provinceKey": 450000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 194,
                    "totalPrice": 1252955,
                    "orderCount": 69882,
                    "onlineCount": 0
                }, {
                    "provinceName": "海南",
                    "provinceKey": 460000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 58,
                    "totalPrice": 617514,
                    "orderCount": 33090,
                    "onlineCount": 0
                }, {
                    "provinceName": "重庆",
                    "provinceKey": 500000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 35,
                    "totalPrice": 468892.6,
                    "orderCount": 20163,
                    "onlineCount": 0
                }, {
                    "provinceName": "四川",
                    "provinceKey": 510000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 127,
                    "totalPrice": 793622.7,
                    "orderCount": 43625,
                    "onlineCount": 0
                }, {
                    "provinceName": "贵州",
                    "provinceKey": 520000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 78,
                    "totalPrice": 659747.2,
                    "orderCount": 28817,
                    "onlineCount": 0
                }, {
                    "provinceName": "云南",
                    "provinceKey": 530000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 87,
                    "totalPrice": 657485.2,
                    "orderCount": 30916,
                    "onlineCount": 0
                }, {
                    "provinceName": "西藏",
                    "provinceKey": 540000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 5,
                    "totalPrice": 106922.4,
                    "orderCount": 2470,
                    "onlineCount": 0
                }, {
                    "provinceName": "陕西",
                    "provinceKey": 610000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 65,
                    "totalPrice": 589961.2,
                    "orderCount": 27093,
                    "onlineCount": 0
                }, {
                    "provinceName": "甘肃",
                    "provinceKey": 620000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 40,
                    "totalPrice": 248209.2,
                    "orderCount": 12390,
                    "onlineCount": 0
                }, {
                    "provinceName": "青海",
                    "provinceKey": 630000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 3,
                    "totalPrice": 33328.1,
                    "orderCount": 1161,
                    "onlineCount": 0
                }, {
                    "provinceName": "宁夏",
                    "provinceKey": 640000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 14,
                    "totalPrice": 146590.7,
                    "orderCount": 5240,
                    "onlineCount": 0
                }, {
                    "provinceName": "新疆",
                    "provinceKey": 650000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 43,
                    "totalPrice": 294423.4,
                    "orderCount": 11741,
                    "onlineCount": 0
                }, {
                    "provinceName": "香港",
                    "provinceKey": 810000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 43,
                    "totalPrice": 294423.4,
                    "orderCount": 11741,
                    "onlineCount": 0
                }, {
                    "provinceName": "澳门",
                    "provinceKey": 820000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 43,
                    "totalPrice": 294423.4,
                    "orderCount": 11741,
                    "onlineCount": 0
                }, {
                    "provinceName": "台湾",
                    "provinceKey": 650000,
                    "cityName": null,
                    "cityKey": null,
                    "shopCount": 43,
                    "totalPrice": 294423.4,
                    "orderCount": 11741,
                    "onlineCount": 0
                }
            ]
            var seriesData = [];
            for (var i = 0; i < toolTipData.length; i++) {
                seriesData[i] = {};
                seriesData[i].name = toolTipData[i].provinceName;
                seriesData[i].value = toolTipData[i].shopCount;
                seriesData[i].provinceKey = toolTipData[i].provinceKey;
            }
            console.log(seriesData, "全国数据")
            // 请求省市数据，传递provinceKey进行ajax请求 province(key)
            // var provinceData = [
            //     {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "乌鲁木齐市",
            //         "cityKey": 650100,
            //         "shopCount": 17,
            //         "totalPrice": 89429.1,
            //         "orderCount": 4019,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "克拉玛依市",
            //         "cityKey": 650200,
            //         "shopCount": 1,
            //         "totalPrice": 363.6,
            //         "orderCount": 17,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "昌吉回族自治州",
            //         "cityKey": 652300,
            //         "shopCount": 3,
            //         "totalPrice": 2203.7,
            //         "orderCount": 82,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "博尔塔拉蒙古自治州",
            //         "cityKey": 652700,
            //         "shopCount": 1,
            //         "totalPrice": 7327.7,
            //         "orderCount": 236,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "巴音郭楞蒙古自治州",
            //         "cityKey": 652800,
            //         "shopCount": 2,
            //         "totalPrice": 28768.4,
            //         "orderCount": 961,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "阿克苏地区",
            //         "cityKey": 652900,
            //         "shopCount": 5,
            //         "totalPrice": 78415.2,
            //         "orderCount": 3108,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "喀什地区",
            //         "cityKey": 653100,
            //         "shopCount": 4,
            //         "totalPrice": 38870.1,
            //         "orderCount": 1477,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "和田地区",
            //         "cityKey": 653200,
            //         "shopCount": 1,
            //         "totalPrice": 10488,
            //         "orderCount": 218,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "伊犁哈萨克自治州",
            //         "cityKey": 654000,
            //         "shopCount": 6,
            //         "totalPrice": 32864.2,
            //         "orderCount": 1363,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "塔城地区",
            //         "cityKey": 654200,
            //         "shopCount": 1,
            //         "totalPrice": 160,
            //         "orderCount": 5,
            //         "onlineCount": 0
            //     }, {
            //         "provinceName": null,
            //         "provinceKey": null,
            //         "cityName": "省直辖行政单位",
            //         "cityKey": 659000,
            //         "shopCount": 2,
            //         "totalPrice": 5533.4,
            //         "orderCount": 255,
            //         "onlineCount": 0
            //     }
            // ];
            // var seriesDataPro = [];
            // for (var i = 0; i < provinceData.length; i++) {
            //     seriesDataPro[i] = {};
            //     seriesDataPro[i].name = provinceData[i].cityName;
            //     seriesDataPro[i].value = provinceData[i].shopCount;
            // }
            // console.log(seriesDataPro,"全国数据hhh")

            var max = Math.max.apply(Math, seriesData.map(function (o) {
                    return o.value
                })),
                min = 0; // 侧边最大值最小值
            var maxSize4Pin = 40,
                minSize4Pin = 30;
            // 点击返回按钮
            // oBack.onclick = function () {
            //     $('#back').addClass('hidden');
            //     mapName = '';
            //     initEcharts("china", "中国");
            // };

            var mapName = '';
            const data = [
                {name: '海门', value: 9},
                {name: '鄂尔多斯', value: 12},
                {name: '招远', value: 12},
                {name: '舟山', value: 12},
                {name: '齐齐哈尔', value: 14},
                {name: '盐城', value: 15},
                {name: '赤峰', value: 16},
                {name: '青岛', value: 18},
                {name: '乳山', value: 18},
                {name: '金昌', value: 19},
                {name: '泉州', value: 21},
                {name: '莱西', value: 21},
                {name: '日照', value: 21},
                {name: '胶南', value: 22},
                {name: '南通', value: 23},
                {name: '拉萨', value: 24},
                {name: '云浮', value: 24},
                {name: '梅州', value: 25},
                {name: '文登', value: 25},
                {name: '上海', value: 25},
                {name: '攀枝花', value: 25},
                {name: '威海', value: 25},
                {name: '承德', value: 25},
                {name: '厦门', value: 26},
                {name: '汕尾', value: 26},
                {name: '潮州', value: 26},
                {name: '丹东', value: 27},
                {name: '太仓', value: 27},
                {name: '曲靖', value: 27},
                {name: '烟台', value: 28},
                {name: '福州', value: 29},
                {name: '瓦房店', value: 30},
                {name: '即墨', value: 30},
                {name: '抚顺', value: 31},
                {name: '玉溪', value: 31},
                {name: '张家口', value: 31},
                {name: '阳泉', value: 31},
                {name: '莱州', value: 32},
                {name: '湖州', value: 32},
                {name: '汕头', value: 32},
                {name: '昆山', value: 33},
                {name: '宁波', value: 33},
                {name: '湛江', value: 33},
                {name: '揭阳', value: 34},
                {name: '荣成', value: 34},
                {name: '连云港', value: 35},
                {name: '葫芦岛', value: 35},
                {name: '常熟', value: 36},
                {name: '东莞', value: 36},
                {name: '河源', value: 36},
                {name: '淮安', value: 36},
                {name: '泰州', value: 36},
                {name: '南宁', value: 37},
                {name: '营口', value: 37},
                {name: '惠州', value: 37},
                {name: '江阴', value: 37},
                {name: '蓬莱', value: 37},
                {name: '韶关', value: 38},
                {name: '嘉峪关', value: 38},
                {name: '广州', value: 38},
                {name: '延安', value: 38},
                {name: '太原', value: 39},
                {name: '清远', value: 39},
                {name: '中山', value: 39},
                {name: '昆明', value: 39},
                {name: '寿光', value: 40},
                {name: '盘锦', value: 40},
                {name: '长治', value: 41},
                {name: '深圳', value: 41},
                {name: '珠海', value: 42},
                {name: '宿迁', value: 43},
                {name: '咸阳', value: 43},
                {name: '铜川', value: 44},
                {name: '平度', value: 44},
                {name: '佛山', value: 44},
                {name: '海口', value: 44},
                {name: '江门', value: 45},
                {name: '章丘', value: 45},
                {name: '肇庆', value: 46},
                {name: '大连', value: 47},
                {name: '临汾', value: 47},
                {name: '吴江', value: 47},
                {name: '石嘴山', value: 49},
                {name: '沈阳', value: 50},
                {name: '苏州', value: 50},
                {name: '茂名', value: 50},
                {name: '嘉兴', value: 51},
                {name: '长春', value: 51},
                {name: '胶州', value: 52},
                {name: '银川', value: 52},
                {name: '张家港', value: 52},
                {name: '三门峡', value: 53},
                {name: '锦州', value: 54},
                {name: '南昌', value: 54},
                {name: '柳州', value: 54},
                {name: '三亚', value: 54},
                {name: '自贡', value: 56},
                {name: '吉林', value: 56},
                {name: '阳江', value: 57},
                {name: '泸州', value: 57},
                {name: '西宁', value: 57},
                {name: '宜宾', value: 58},
                {name: '呼和浩特', value: 58},
                {name: '成都', value: 58},
                {name: '大同', value: 58},
                {name: '镇江', value: 59},
                {name: '桂林', value: 59},
                {name: '张家界', value: 59},
                {name: '宜兴', value: 59},
                {name: '北海', value: 60},
                {name: '西安', value: 61},
                {name: '金坛', value: 62},
                {name: '东营', value: 62},
                {name: '牡丹江', value: 63},
                {name: '遵义', value: 63},
                {name: '绍兴', value: 63},
                {name: '扬州', value: 64},
                {name: '常州', value: 64},
                {name: '潍坊', value: 65},
                {name: '重庆', value: 66},
                {name: '台州', value: 67},
                {name: '南京', value: 67},
                {name: '滨州', value: 70},
                {name: '贵阳', value: 71},
                {name: '无锡', value: 71},
                {name: '本溪', value: 71},
                {name: '克拉玛依', value: 72},
                {name: '渭南', value: 72},
                {name: '马鞍山', value: 72},
                {name: '宝鸡', value: 72},
                {name: '焦作', value: 75},
                {name: '句容', value: 75},
                {name: '北京', value: 79},
                {name: '徐州', value: 79},
                {name: '衡水', value: 80},
                {name: '包头', value: 80},
                {name: '绵阳', value: 80},
                {name: '乌鲁木齐', value: 84},
                {name: '枣庄', value: 84},
                {name: '杭州', value: 84},
                {name: '淄博', value: 85},
                {name: '鞍山', value: 86},
                {name: '溧阳', value: 86},
                {name: '库尔勒', value: 86},
                {name: '安阳', value: 90},
                {name: '开封', value: 90},
                {name: '济南', value: 92},
                {name: '德阳', value: 93},
                {name: '温州', value: 95},
                {name: '九江', value: 96},
                {name: '邯郸', value: 98},
                {name: '临安', value: 99},
                {name: '兰州', value: 99},
                {name: '沧州', value: 100},
                {name: '临沂', value: 103},
                {name: '南充', value: 104},
                {name: '天津', value: 105},
                {name: '富阳', value: 106},
                {name: '泰安', value: 112},
                {name: '诸暨', value: 112},
                {name: '郑州', value: 113},
                {name: '哈尔滨', value: 114},
                {name: '聊城', value: 116},
                {name: '芜湖', value: 117},
                {name: '唐山', value: 119},
                {name: '平顶山', value: 119},
                {name: '邢台', value: 119},
                {name: '德州', value: 120},
                {name: '济宁', value: 120},
                {name: '荆州', value: 127},
                {name: '宜昌', value: 130},
                {name: '义乌', value: 132},
                {name: '丽水', value: 133},
                {name: '洛阳', value: 134},
                {name: '秦皇岛', value: 136},
                {name: '株洲', value: 143},
                {name: '石家庄', value: 147},
                {name: '莱芜', value: 148},
                {name: '常德', value: 152},
                {name: '保定', value: 153},
                {name: '湘潭', value: 154},
                {name: '金华', value: 157},
                {name: '岳阳', value: 169},
                {name: '长沙', value: 175},
                {name: '衢州', value: 177},
                {name: '廊坊', value: 193},
                {name: '菏泽', value: 194},
                {name: '合肥', value: 229},
                {name: '武汉', value: 273},
                {name: '大庆', value: 279}
            ];
            const geoCoordMap = {
                海门: [121.15, 31.89],
                鄂尔多斯: [109.781327, 39.608266],
                招远: [120.38, 37.35],
                舟山: [122.207216, 29.985295],
                齐齐哈尔: [123.97, 47.33],
                盐城: [120.13, 33.38],
                赤峰: [118.87, 42.28],
                青岛: [120.33, 36.07],
                乳山: [121.52, 36.89],
                金昌: [102.188043, 38.520089],
                泉州: [118.58, 24.93],
                莱西: [120.53, 36.86],
                日照: [119.46, 35.42],
                胶南: [119.97, 35.88],
                南通: [121.05, 32.08],
                拉萨: [91.11, 29.97],
                云浮: [112.02, 22.93],
                梅州: [116.1, 24.55],
                文登: [122.05, 37.2],
                上海: [121.48, 31.22],
                攀枝花: [101.718637, 26.582347],
                威海: [122.1, 37.5],
                承德: [117.93, 40.97],
                厦门: [118.1, 24.46],
                汕尾: [115.375279, 22.786211],
                潮州: [116.63, 23.68],
                丹东: [124.37, 40.13],
                太仓: [121.1, 31.45],
                曲靖: [103.79, 25.51],
                烟台: [121.39, 37.52],
                福州: [119.3, 26.08],
                瓦房店: [121.979603, 39.627114],
                即墨: [120.45, 36.38],
                抚顺: [123.97, 41.97],
                玉溪: [102.52, 24.35],
                张家口: [114.87, 40.82],
                阳泉: [113.57, 37.85],
                莱州: [119.942327, 37.177017],
                湖州: [120.1, 30.86],
                汕头: [116.69, 23.39],
                昆山: [120.95, 31.39],
                宁波: [121.56, 29.86],
                湛江: [110.359377, 21.270708],
                揭阳: [116.35, 23.55],
                荣成: [122.41, 37.16],
                连云港: [119.16, 34.59],
                葫芦岛: [120.836932, 40.711052],
                常熟: [120.74, 31.64],
                东莞: [113.75, 23.04],
                河源: [114.68, 23.73],
                淮安: [119.15, 33.5],
                泰州: [119.9, 32.49],
                南宁: [108.33, 22.84],
                营口: [122.18, 40.65],
                惠州: [114.4, 23.09],
                江阴: [120.26, 31.91],
                蓬莱: [120.75, 37.8],
                韶关: [113.62, 24.84],
                嘉峪关: [98.289152, 39.77313],
                广州: [113.23, 23.16],
                延安: [109.47, 36.6],
                太原: [112.53, 37.87],
                清远: [113.01, 23.7],
                中山: [113.38, 22.52],
                昆明: [102.73, 25.04],
                寿光: [118.73, 36.86],
                盘锦: [122.070714, 41.119997],
                长治: [113.08, 36.18],
                深圳: [114.07, 22.62],
                珠海: [113.52, 22.3],
                宿迁: [118.3, 33.96],
                咸阳: [108.72, 34.36],
                铜川: [109.11, 35.09],
                平度: [119.97, 36.77],
                佛山: [113.11, 23.05],
                海口: [110.35, 20.02],
                江门: [113.06, 22.61],
                章丘: [117.53, 36.72],
                肇庆: [112.44, 23.05],
                大连: [121.62, 38.92],
                临汾: [111.5, 36.08],
                吴江: [120.63, 31.16],
                石嘴山: [106.39, 39.04],
                沈阳: [123.38, 41.8],
                苏州: [120.62, 31.32],
                茂名: [110.88, 21.68],
                嘉兴: [120.76, 30.77],
                长春: [125.35, 43.88],
                胶州: [120.03336, 36.264622],
                银川: [106.27, 38.47],
                张家港: [120.555821, 31.875428],
                三门峡: [111.19, 34.76],
                锦州: [121.15, 41.13],
                南昌: [115.89, 28.68],
                柳州: [109.4, 24.33],
                三亚: [109.511909, 18.252847],
                自贡: [104.778442, 29.33903],
                吉林: [126.57, 43.87],
                阳江: [111.95, 21.85],
                泸州: [105.39, 28.91],
                西宁: [101.74, 36.56],
                宜宾: [104.56, 29.77],
                呼和浩特: [111.65, 40.82],
                成都: [104.06, 30.67],
                大同: [113.3, 40.12],
                镇江: [119.44, 32.2],
                桂林: [110.28, 25.29],
                张家界: [110.479191, 29.117096],
                宜兴: [119.82, 31.36],
                北海: [109.12, 21.49],
                西安: [108.95, 34.27],
                金坛: [119.56, 31.74],
                东营: [118.49, 37.46],
                牡丹江: [129.58, 44.6],
                遵义: [106.9, 27.7],
                绍兴: [120.58, 30.01],
                扬州: [119.42, 32.39],
                常州: [119.95, 31.79],
                潍坊: [119.1, 36.62],
                重庆: [106.54, 29.59],
                台州: [121.420757, 28.656386],
                南京: [118.78, 32.04],
                滨州: [118.03, 37.36],
                贵阳: [106.71, 26.57],
                无锡: [120.29, 31.59],
                本溪: [123.73, 41.3],
                克拉玛依: [84.77, 45.59],
                渭南: [109.5, 34.52],
                马鞍山: [118.48, 31.56],
                宝鸡: [107.15, 34.38],
                焦作: [113.21, 35.24],
                句容: [119.16, 31.95],
                北京: [116.46, 39.92],
                徐州: [117.2, 34.26],
                衡水: [115.72, 37.72],
                包头: [110, 40.58],
                绵阳: [104.73, 31.48],
                乌鲁木齐: [87.68, 43.77],
                枣庄: [117.57, 34.86],
                杭州: [120.19, 30.26],
                淄博: [118.05, 36.78],
                鞍山: [122.85, 41.12],
                溧阳: [119.48, 31.43],
                库尔勒: [86.06, 41.68],
                安阳: [114.35, 36.1],
                开封: [114.35, 34.79],
                济南: [117, 36.65],
                德阳: [104.37, 31.13],
                温州: [120.65, 28.01],
                九江: [115.97, 29.71],
                邯郸: [114.47, 36.6],
                临安: [119.72, 30.23],
                兰州: [103.73, 36.03],
                沧州: [116.83, 38.33],
                临沂: [118.35, 35.05],
                南充: [106.110698, 30.837793],
                天津: [117.2, 39.13],
                富阳: [119.95, 30.07],
                泰安: [117.13, 36.18],
                诸暨: [120.23, 29.71],
                郑州: [113.65, 34.76],
                哈尔滨: [126.63, 45.75],
                聊城: [115.97, 36.45],
                芜湖: [118.38, 31.33],
                唐山: [118.02, 39.63],
                平顶山: [113.29, 33.75],
                邢台: [114.48, 37.05],
                德州: [116.29, 37.45],
                济宁: [116.59, 35.38],
                荆州: [112.239741, 30.335165],
                宜昌: [111.3, 30.7],
                义乌: [120.06, 29.32],
                丽水: [119.92, 28.45],
                洛阳: [112.44, 34.7],
                秦皇岛: [119.57, 39.95],
                株洲: [113.16, 27.83],
                石家庄: [114.48, 38.03],
                莱芜: [117.67, 36.19],
                常德: [111.69, 29.05],
                保定: [115.48, 38.85],
                湘潭: [112.91, 27.87],
                金华: [119.64, 29.12],
                岳阳: [113.09, 29.37],
                长沙: [113, 28.21],
                衢州: [118.88, 28.97],
                廊坊: [116.7, 39.53],
                菏泽: [115.480656, 35.23375],
                合肥: [117.27, 31.86],
                武汉: [114.31, 30.52],
                大庆: [125.03, 46.58]
            };

            function getGeoCoordMap(name) {
                name = name ? name : 'china';
                /*获取地图数据*/
                var geoCoordMap = {};
                myChart.showLoading(); // loading start
                var mapFeatures = echarts.getMap(name).geoJson.features;
                myChart.hideLoading(); // loading end
                mapFeatures.forEach(function (v) {
                    var name = v.properties.name; // 地区名称
                    geoCoordMap[name] = v.properties.cp; // 地区经纬度
                });
                return geoCoordMap;
            }

            function convertData(data) { // 转换数据
                var geoCoordMap = getGeoCoordMap(mapName);
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name]; // 数据的名字对应的经纬度
                    if (geoCoord) { // 如果数据data对应上，
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                        });
                    }
                }
                return res;
            };
            const convertDataD = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            // 初始化echarts-map
            initEcharts("china", "中国");

            function initEcharts(pName, Chinese_) {
                var tmpSeriesData = seriesData;
                var tmp = toolTipData;
                var option = {
                    // title: {
                    //     text: Chinese_ || pName,
                    //     left: 'center'
                    // },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) { // 鼠标滑过显示的数据
                            // if (pName === "china") {
                            var toolTiphtml = ''
                            for (var i = 0; i < tmp.length; i++) {
                                if (params.name == tmp[i].provinceName) {
                                    toolTiphtml += tmp[i].provinceName + '<br>销售额：' + unitConvert(tmp[i].totalPrice) + '<br>订单数：' + tmp[i].orderCount + '单' + '<br>门店数：' + tmp[i].shopCount;
                                }
                            }
                            return toolTiphtml;
                            // } else {
                            //     var toolTiphtml = ''
                            //     for (var i = 0; i < tmp.length; i++) {
                            //         if (params.name == tmp[i].cityName) {
                            //             toolTiphtml += tmp[i].cityName + '<br>销售额：' + unitConvert(tmp[i].totalPrice) + '<br>订单数：' + tmp[i].orderCount + '单' + '<br>门店数：' + tmp[i].shopCount;
                            //         }
                            //     }
                            //     return toolTiphtml;
                            // }
                        }
                    },
                    visualMap: { //视觉映射组件
                        show: false,
                        min: min,
                        max: max, // 侧边滑动的最大值，从数据中获取
                        left: '5%',
                        top: '96%',
                        inverse: true, //是否反转 visualMap 组件
                        // itemHeight:200,  //图形的高度，即长条的高度
                        // text: ['高', '低'], // 文本，默认为数值文本
                        calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
                        seriesIndex: 1, //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
                        orient: "horizontal",
                        inRange: {
                            color: ['#dbfefe', '#1066d5'] // 蓝绿
                        }
                    },
                    geo: {
                        show: true,
                        map: pName,
                        roam: false,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#3c8dbc', // 没有值得时候颜色
                                borderColor: '#097bba',
                            },
                            emphasis: {
                                areaColor: '#fbd456', // 鼠标滑过选中的颜色
                            }
                        }
                    },
                    series: [
                        {
                            name: '散点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: tmpSeriesData,
                            symbolSize: '1',
                            label: {
                                normal: {
                                    show: true,
                                    formatter: '{b}',
                                    position: 'right'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#895139' // 字体颜色
                                }
                            }
                        },
                        {
                            name: Chinese_ || pName,
                            type: 'map',
                            mapType: pName,
                            roam: false, //是否开启鼠标缩放和平移漫游
                            data: tmpSeriesData,
                            // top: "3%",//组件距离容器的距离
                            // geoIndex: 0,
                            // aspectScale: 0.75,       //长宽比
                            // showLegendSymbol: false, // 存在legend时显示
                            selectedMode: 'single',
                            label: {
                                normal: {
                                    show: true, //显示省份标签
                                    textStyle: {
                                        color: "#895139"
                                    } //省份标签字体颜色
                                },
                                emphasis: { //对应的鼠标悬浮效果
                                    show: true,
                                    textStyle: {
                                        color: "#323232"
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: .5, //区域边框宽度
                                    borderColor: '#0550c3', //区域边框颜色
                                    areaColor: "#0b7e9e", //区域颜色
                                },
                                emphasis: {
                                    borderWidth: .5,
                                    borderColor: '#4b0082',
                                    areaColor: "#ece39e",
                                }
                            }
                        },
                        {
                            name: '点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin', //气泡
                            symbolSize: function (val) {
                                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                                var b = minSize4Pin - a * min;
                                b = maxSize4Pin - a * max;
                                return a * val[2] + b;
                            },
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.data.value[2];
                                    },
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 9
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'red' //标志颜色'#F62157'
                                }
                            },
                            zlevel: 6,
                            data: convertData(tmpSeriesData),
                        },

                        // {
                        //     name: 'pm2.5',
                        //     type: 'scatter',
                        //     coordinateSystem: 'geo',
                        //     data: convertDataD(data),
                        //     symbolSize: function (val) {
                        //         console.log(val,'iiii')
                        //         return val[2] / 10;
                        //     },
                        //     encode: {
                        //         value: 2
                        //     },
                        //     label: {
                        //         formatter: '{b}',
                        //         position: 'right',
                        //         show: false
                        //     },
                        //     emphasis: {
                        //         label: {
                        //             show: true
                        //         }
                        //     }
                        // },
                        // {
                        //     name: 'Top 5',
                        //     type: 'effectScatter',
                        //     coordinateSystem: 'geo',
                        //     data: convertDataD(
                        //         data
                        //             .sort(function (a, b) {
                        //                 return b.value - a.value;
                        //             })
                        //             .slice(0, 6)
                        //     ),
                        //     symbolSize: function (val) {
                        //         return val[2] / 10;
                        //     },
                        //     encode: {
                        //         value: 2
                        //     },
                        //     showEffectOn: 'render',
                        //     rippleEffect: {
                        //         brushType: 'stroke'
                        //     },
                        //     label: {
                        //         formatter: '{b}',
                        //         position: 'right',
                        //         show: true
                        //     },
                        //     itemStyle: {
                        //         shadowBlur: 10,
                        //         shadowColor: '#333'
                        //     },
                        //     emphasis: {
                        //         scale: true
                        //     },
                        //     zlevel: 1
                        // },
                    ]
                };
                // 针对海南放大
                if (pName == '海南') {
                    option.series[1].center = [109.844902, 19.0392];
                    option.series[1].layoutCenter = ['50%', '50%'];
                    option.series[1].layoutSize = "300%";
                } else { //非显示海南时，将设置的参数恢复默认值
                    option.series[1].center = undefined;
                    option.series[1].layoutCenter = undefined;
                    option.series[1].layoutSize = undefined;
                }
                myChart.setOption(option);
                /* 响应式 */
                // window.resize(function () {
                //     myChart.resize();
                // });

                myChart.off("click");

                if (pName === "china") { // 全国时，添加click 进入省级
                    myChart.on('click', function (param) {
                        // console.log(param.name);
                        if (param.data && param.data.provinceKey) {
                            var key = param.data.provinceKey;
                            // province(key);  省份请求
                            if (provinceData.length) {
                                // $('#back').removeClass('hidden');
                                // 遍历取到provincesText 中的下标  去拿到对应的省js
                                for (var i = 0; i < provincesText.length; i++) {
                                    if (param.name === provincesText[i]) {
                                        mapName = provincesText[i];
                                        //显示对应省份的方法
                                        showProvince(provinces[i], provincesText[i]);
                                        break;
                                    }
                                }
                            }
                        }
                    });
                } else { // 省份，添加双击 回退到全国
                    myChart.on("dblclick", function () {
                        // $('#back').addClass('hidden');
                        mapName = '';
                        initEcharts("china", "中国");
                    });
                }
            }

            // 展示对应的省
            function showProvince(pName, Chinese_) {
                //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
                loadBdScript('$' + pName + 'JS', './js/map/province/' + pName + '.js', function () {
                    initEcharts(Chinese_);
                });
            }

            // 加载对应的JS
            function loadBdScript(scriptId, url, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else { // Others
                    script.onload = function () {
                        callback();
                    };
                }
                script.src = url;
                script.id = scriptId;
                document.getElementsByTagName("head")[0].appendChild(script);
            };
        },
        beforeDestroy() {
            clearInterval(this.timerC);
            clearInterval(this.timerH);
        }
    }
</script>

<style scoped lang="scss">
    #Home {
        display: flex;
        flex-direction: column;
        height: 1920px;
        width: 1600px;
        /*background-color: #1e88e5;*/
        position: relative;
        background: url("../assets/img/bg_1.png") no-repeat;
        background-size: cover;

    }

    .header {
        color: #FFF;
        z-index: 10;

        .time-weather {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 106px;
            padding: 8px 100px 0;

            .timeBox {
                font-size: 24px;
                letter-spacing: 0.5px;
            }

        }

        .data-time {
            height: 287px;
            position: relative;

            dl {
                background:url("../assets/img/teb_00.png") no-repeat;
                background-size: cover;
                width: 439px;
                height: 287px;
                position: absolute;
                top: 18px;

                dt {
                    text-align: center;
                    font-size: 26px;
                    padding: 78px 0 0 0;
                    font-weight: bold;
                    color: #c3f5fe; // #c0dbf0 #ffffff
                }

                dd {
                    text-align: center;
                    font-size: 42px;
                    padding: 3px 0 0 0;
                    font-weight: bold;
                    /*color: #fff;*/
                    background-image: -webkit-linear-gradient(bottom, #d6e3f6 10%, #FFF);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }

            dl:nth-child(1) {
                left: 0;
            }

            dl:nth-child(2) {
                left: 386px;
            }

            dl:nth-child(3) {
                left: 772px;
            }

            dl:nth-child(4) {
                left: 1158px;
            }
        }
    }

    .map {
        height: 1650px;
        width: 1650px;
        position: absolute;
        top: -10px;
        left: 56%;
        z-index: 1;
        transform: translateX(-50%);
        /*background-color: #1e88e5;*/
    }

    .qr-code-data{
        position: absolute;
        z-index: 10;
        bottom: 605px;
        left: 40px;
        height: 497px;
        width: 381px;
        /*background-color: rgba(0, 0, 0, 0.7);*/
        background: url("../assets/img/qr_code_00.png") no-repeat;
        background-size: cover;
        .day-data {
            /*display: none;*/
            width: 286px;
            height: 146px;
            /*background-color: yellow;*/
            position: absolute;
            top: 0px;
            left: 4px;
            letter-spacing: 0.5px;

            dt {
                text-align: center;
                padding: 26px 0 0 2px;
                color: #c2f5fe;
                font-size: 26px;
                font-weight: bold;
            }

            dd {
                text-align: center;
                font-size: 42px;
                padding: 0 0 0 0;
                font-weight: bold;
                background-image: -webkit-linear-gradient(bottom, #d6e3f6 10%, #FFF);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

        }

        .rq-code {

            /*display: none;*/
            overflow: hidden;
            position: absolute;
            top: 205px;
            left: 48px;
            width: 200px;
            height: 269px;

            img {
                width: 100%;
                height: 100%;
            }

            /*display: none;*/
        }
    }

    .commodity-data {
        /*display: none;*/
        position: absolute;
        z-index: 10;
        bottom: 55px;
        left: 35px;
        height: 527px;
        width: 1511px;
        /*background-color: rgba(0, 0, 0, 0.7);*/
        background: url("../assets/img/b_data_00.png") no-repeat;
        background-size: cover;
        /*flex-grow: 1;*/
        /*background-color: yellow;*/


        .HOT-SPOT {
            display: none;
            position: absolute;
            top: -1px;
            left: 18px;
            width: 521px;
            height: 528px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .title {
                width: 100%;
                height: 76px;
                /*background-color:rgba(0,255,255,0.5);*/
                padding: 6px 0 0 22px;
                color: #FFF;
                font-size: 32px;

                letter-spacing: 4.2px;
                /*font-weight: bold;*/
            }

            .content {
                width: 490px;
                height: 426px;
                background-color: #FFF;
                border-radius: 22px;
                overflow: hidden;
                .scroll_list{
                    transition: all 0ms ease-in 0s;
                    /*height: 100%;*/
                    /*white-space: nowrap;*/
                    /*.scrollItemBox{*/
                    /*    height: 100%;*/
                    /*    display: inline-block;*/

                    /*}*/
                }

                img {
                    width: 100%;
                }
            }
        }

        .service-ability {
            position: absolute;
            top: 0px;
            left: 557px;
            width: 953px;
            height: 528px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .title {
                height: 76px;
                padding: 6px 0 0 6px;
                color: #FFF;
                font-size: 32px;
                letter-spacing: 4.2px;
            }

            .data-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                padding: 12px 32px 0 38px;

                dl {
                    display: flex;
                    align-items: center;
                    width: 420px;
                    height: 102px;

                    font-weight: bold;

                    dt {
                        font-size: 24px;
                        padding-left: 40px;
                        width: 220px;

                        color: #c2f5fe;
                        letter-spacing: 3px;
                    }

                    dd {
                        font-size: 40px;
                        color: #FFF;
                    }
                }
            }

            .log-box {
                display: flex;
                flex-direction: column;
                /*justify-content: space-between;*/
                align-items: center;
                width: 100%;
                height: 306px;
                padding: 126px 32px 0 38px;
                /*background-color: rgba(0, 255, 255, 0.5);*/

                .log-box-item {
                    width: 100%;
                    overflow: hidden;
                    /*background-color: rgba(255, 255, 0, 0.5);*/
                    display: flex;
                    padding-left: 40px;
                    /*margin-top: 20px;*/
                    .scroll_list{
                        height: 38px;
                        white-space: nowrap;
                        .scrollItemBox{
                            white-space: nowrap;
                            display: inline-block;

                        }
                    }
                    .img-box {

                        height: 38px;
                        min-width: 170px;
                        display: inline-block;

                        img {
                            height: 100%;
                        }
                    }
                }

                .log-box-item:nth-child(2) {
                    margin-top: 48px;
                }
            }
        }
    }

    /*}*/
</style>
