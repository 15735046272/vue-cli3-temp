<template>
    <div class='share-wrapper'>
        <a href="javaScript:void(0)" @click="start">
            <div class="box" ref="share">
                <div class="box-item">
                    <yd-slider autoplay="3000" :loop="false">
                        <yd-slider-item v-for="(img,index) in imgList" :key="index">
                            <a href="javaScript:void(0);">
                                <img :src="img" ref="img">
                            </a>
                        </yd-slider-item>
                    </yd-slider>
                    <div class="content-wrapper">
                        <div class="title">
                            <div class="title-list">
                                <span class="title-plat" v-if="goodsDetail.itemType === 'B'">天猫</span>
                                <span class="title-plat" v-if="goodsDetail.itemType === 'C'">淘宝</span>
                                <span class="title-plat" v-if="goodsDetail.itemType === 'J'">京东</span>
                                <span class="title-plat" v-if="goodsDetail.itemType === 'P'">拼多多</span>
                                <span class="text">{{goodsDetail.itemTitle}}</span>
                            </div>
                            <div class="send-list">
                                <span class="send" v-if="goodsDetail.freeShipment === true">包邮</span>
                                <span class="send" v-if="goodsDetail.freeShipment === false">不包邮</span>
                            </div>
                        </div>
                        <div class="desc">
                <span class="tm-price"> <span class="title-plat" v-if="goodsDetail.itemType === 'B'">天猫</span>
                    <span class="title-plat" v-if="goodsDetail.itemType === 'C'">淘宝</span>
                    <span class="title-plat" v-if="goodsDetail.itemType === 'J'">京东</span>
                    <span class="title-plat"
                          v-if="goodsDetail.itemType === 'P'">拼多多</span>{{goodsDetail.itemPrice}}</span>
                            <span class="num">已抢{{goodsDetail.itemSale}}件</span>
                        </div>
                        <div class="detaiil">
                            <span class="back">到手价￥</span><span class="back-price">{{goodsDetail.fanlihoMoney}}</span>
                            <span class="done">收货后</span><span class="done-price">补贴{{goodsDetail.fanliMoney}}</span>
                            <span class="subsidy">怎么补贴</span>
                        </div>
                        <div class="ticket" v-if="goodsDetail.hasCoupon === true">
                            <span class="ticket-price"><span class="text">{{goodsDetail.couponMoney}}</span>元优惠券</span>
                            <span class="ticket-time"><span>使用期限</span>{{$moment(goodsDetail.couponStartTime * 1000).format('YYYY.MM.DD')}}-{{$moment(goodsDetail.couponEndTime * 1000).format('YYYY.MM.DD')}}</span>
                        </div>
                    </div>
                    <ul class="enjoy-wrapper">
                        <li class="title"><span class="line"></span><h1>猜你喜欢</h1><span class="line"></span></li>
                        <li class="enjoy-item" v-for="enjoyItem in enjoyList" :key="enjoyItem.itemShortTitle">
                            <div class="left"><img :src="enjoyItem.itempictUrl" alt=""></div>
                            <div class="right  border-1px">
                    <span class="title-top">
                        <span class="title-plat" v-if="enjoyItem.itemType === 'B'">天猫</span>
                        <span class="title-plat" v-if="enjoyItem.itemType === 'C'">淘宝</span>
                        <span class="title-plat" v-if="enjoyItem.itemType === 'J'">京东</span>
                        <span class="title-plat" v-if="enjoyItem.itemType === 'P'">拼多多</span>
                        <span class="text">{{enjoyItem.itemShortTitle}}</span>
                    </span>
                                <div class="subsidy-wrapper">
                                    <span class="ticket-icon">券{{enjoyItem.couponMoney}}</span>
                                    <span class="subsidy-text">补贴{{enjoyItem.fanliMoney}}</span>
                                </div>
                                <div class="price-wrapper">
                                <span class="newPrice">￥<span
                                        class="newPrice-text">{{enjoyItem.fanlihoMoney}}</span></span>
                                    <span class="oldPrice">￥{{enjoyItem.itemPrice}}</span>
                                    <span class="buy">已抢{{enjoyItem.itemSale}}件</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </a>
        <div class="frame-wrapper" v-if="show">
            <a href="javaScript:void(0);" @click="close">
                <yd-icon name="error-outline" class="close"></yd-icon>
            </a>
            <span class="sy-logo"></span>
            <span class="text">省钱+赚钱的购物App</span>
            <span class="face"></span>
            <span class="start-btn" @click="start">立即打开</span>
        </div>
        <a href="javaScript:void(0)" @click="start">
            <div class="buy-wrapper">
                <div class="ticket-wrapper">
                    <div class="no-ticket">
                        <div class="content">￥<span class="price">{{goodsDetail.itemPrice}}</span></div>
                        <div class="text">不领券</div>
                    </div>
                    <div class="has-ticket">
                        <div class="content">￥<span class="price">{{goodsDetail.fanlihoMoney}}</span></div>
                        <div class="text">领券购买</div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: "share",
        metaInfo: {
            title: '商品详情',
        },
        data() {
            return {
                // 商品详情
                goodsDetail: {
                    type: Object,
                },
                // 猜你喜欢
                enjoyList: {
                    type: Array,
                },
                show: true,
                imgList: [],
                id: 592201475811,
                cutIndex: 1,
            };
        },
        created() {
            this.id = this.$route.query.id;
            this.$axios.get('http://47.98.132.55:8892/mobile/home/getHdkSearchItemIdDetail?itemId=' + this.id).then((res) => {
                if (res.status === 200) {
                    this.goodsDetail = res.data.data.data[0];
                    this.$nextTick(() => {
                        this.imgList = this.goodsDetail.itemSmallImages.split(',');
                        this._initScroll();
                    });
                }
            }).catch((error) => {
                console.log('error', error);
            });
            this.$axios.get('http://47.98.132.55:8892/mobile/home/getSimilarInfo2?itemId=' + this.id).then((res) => {
                if (res.status === 200) {
                    this.enjoyList = res.data.data.data;
                }
            }).catch((error) => {
                console.log('error', error);
            });
        },
        methods: {
            _initScroll() {
                this.scroll = new BScroll(this.$refs.share, {
                    click: true,
                });
            },
            close() {
                this.show = false;
            },
            start() {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if (isAndroid) {
                    window.location.href = 'http://a.app.qq.com/o/simple.jsp';
                };
                if (isiOS) {
                    window.location.href = 'itms-apps://itunes.apple.com/app/id1061880281';
                };
            },
        },
    };
</script>

<style scoped lang='less'>
    @import "../../common/less/mixin";

    .share-wrapper {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: relative;

        .box {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 50px;
            width: 100%;
            height: 100%;

            .yd-slider-item {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;

                a {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .content-wrapper {
                background: #fff;
                padding: 10px;
                width: 100%;

                .title {
                    width: 100%;
                    position: relative;

                    .title-list {
                        width: 80%;

                        .title-plat {
                            display: inline-block;
                            vertical-align: middle;
                            width: 30px;
                            height: 14px;
                            font-size: 10px;
                            color: #fff;
                            text-align: center;
                            line-height: 16px;
                            background-size: 30px 14px;
                            background-repeat: no-repeat;
                            .bg-image('../../../public/static/img/plat');
                        }

                        .text {
                            vertical-align: middle;
                            line-height: 20px;
                            font-size: 14px;
                            color: #323232;
                        }
                    }

                    .send-list {
                        position: absolute;
                        top: 5px;
                        right: 10px;
                        width: 10%;
                        height: 20px;
                        line-height: 20px;
                        font-size: 10px;
                        color: #999999;
                    }

                }

                .desc {
                    font-size: 12px;
                    color: #999;
                    width: 100%;
                    height: 14px;
                    line-height: 14px;
                    margin: 10px 0 16px 0;
                    overflow: hidden;

                    .num {
                        float: right;
                        margin-top: 1px;
                    }
                }

                .detaiil {
                    font-size: 12px;
                    color: #999;
                    line-height: 18px;
                    height: 18px;

                    .back-price {
                        font-size: 16px;
                        color: #FF621B;
                        margin-right: 8px;
                    }

                    .done {
                        margin-right: 2px;
                    }

                    .done-price {
                        display: inline-block;
                        width: 58px;
                        height: 16px;
                        font-size: 12px;
                        color: #FF621B;
                        text-align: center;
                        line-height: 14px;
                        background-size: 58px 16px;
                        background-repeat: no-repeat;
                        .bg-image('../../../public/static/img/done');
                    }

                    .subsidy {
                        display: inline-block;
                        width: 58px;
                        height: 16px;
                        font-size: 12px;
                        color: #999;
                        text-align: center;
                        line-height: 16px;
                        background-size: 58px 16px;
                        background-repeat: no-repeat;
                        margin-left: 16px;
                        .bg-image('../../../public/static/img/subsidy');
                    }
                }

                .ticket {
                    position: relative;
                    width: 100%;
                    height: 75px;
                    margin: 8px auto 5px auto;
                    background-size: 100% 75px;
                    background-repeat: no-repeat;
                    color: #fff;
                    .bg-image('../../../public/static/img/ticket');

                    .ticket-price {
                        position: absolute;
                        top: 16px;
                        left: 26px;
                        font-size: 16px;

                        .text {
                            font-size: 26px;
                            font-weight: 700;
                            margin-right: 2px;
                        }
                    }

                    .ticket-time {
                        position: absolute;
                        bottom: 16px;
                        left: 26px;
                        font-size: 12px;
                    }
                }

            }

            .enjoy-wrapper {
                margin-top: 10px;
                padding: 10px;
                background: #fff;

                .title {
                    display: flex;
                    width: 90%;
                    margin:0 auto 20px auto;
                    align-items: center;
                    font-size: 18px;
                    color: #323232;
                    text-align: center;
                    .line{
                        flex: 0 0 100px;
                        border-top: 1px solid #eee;
                        margin: 0 5px;
                    }
                    h1{
                        flex: 1;
                        font-size: 16px;
                    }

                }

                .enjoy-item {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    width: 100%;
                    height: 147px;
                    margin-bottom: 5px;

                    .left {
                        flex: 0 0 140px;
                        width: 140px;
                        height: 140px;
                        border-radius: 10px;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .right {
                        margin-left: 15px;
                        flex: 1;
                        margin-top: 8px;
                        vertical-align: top;
                        .border-1px(#F2F2F2);

                        .title-top {
                            display: inline-block;
                            width: 100%;
                            font-size: 14px;
                            color: #484848;

                            .title-plat {
                                display: inline-block;
                                vertical-align: middle;
                                width: 26px;
                                height: 14px;
                                text-align: center;
                                line-height: 14px;
                                font-size: 10px;
                                color: #fff;
                                background-size: 26px 14px;
                                background-repeat: no-repeat;
                                .bg-image('../../../public/static/img/tm-bg');
                            }

                            .text {
                                line-height: 18px;
                            }
                        }

                        .subsidy-wrapper {
                            width: 100%;
                            margin: 45px 0 12px 0;

                            .ticket-icon {
                                display: inline-block;
                                width: 40px;
                                height: 16px;
                                line-height: 16px;
                                background: #FF621B;
                                text-align: center;
                                color: #ffffff;
                                border-radius: 3px;
                                font-size: 12px;
                            }

                            .subsidy-text {
                                display: inline-block;
                                width: 65px;
                                height: 16px;
                                font-size: 12px;
                                color: #FF621B;
                                text-align: center;
                                line-height: 16px;
                                background-size: 65px 16px;
                                background-repeat: no-repeat;
                                .bg-image('../../../public/static/img/border-1');
                            }
                        }

                        .price-wrapper {
                            .newPrice {
                                font-size: 12px;
                                color: #FB5103;

                                .newPrice-text {
                                    font-size: 20px;
                                    margin-left: 2px;
                                }
                            }

                            .oldPrice {
                                text-decoration: line-through;
                                font-size: 12px;
                                color: #959595;
                            }

                            .buy {
                                float: right;
                                color: #959595;
                                font-size: 10px;
                                margin-top: 6px;
                            }
                        }
                    }
                }
            }
        }

        .frame-wrapper {
            position: absolute;
            z-index: 10;
            top: 0;
            left: 0;
            width: 100%;
            height: 34px;
            padding-left: 10px;
            overflow: hidden;
            background:#333;
            .close {
                padding: 5px;
                font-size: 18px !important;
                color: #959595;
                margin-right: 2px;
                line-height: 34px;
            }

            .sy-logo {
                display: inline-block;
                vertical-align: top;
                margin-top: 4px;
                width: 26px;
                height: 26px;
                background-size: 26px 26px;
                background-repeat: no-repeat;
                .bg-image('../../../public/static/img/sy-logo');
            }
            .text {
                display: inline-block;
                font-size: 14px;
                color: #fff;
                margin-left: 8px;
                vertical-align: top;
                margin-top: 10px;
            }

            .start-btn {
                display: inline-block;
                float: right;
                width: 86px;
                height: 100%;
                line-height: 34px;
                background: #fd503f;
                text-align: center;
                color: #fff;
                font-size: 14px;
            }
        }

        .buy-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 50px;
            padding: 7px 10px;
            background: #fff;
            font-size: 0;
            border-top: 0.01rem solid #eee;
            .ticket-wrapper{
                .no-ticket {
                    display: inline-block;
                    width: 30%;
                    padding: 5px 0;
                    height: 100%;
                    background: #FF8901;
                    border-radius: 20px 0 0 20px;
                    color: #fff;

                    .content {
                        width: 100%;
                        text-align: center;
                        font-size: 10px;

                        .price {
                            vertical-align: bottom;
                            font-size: 14px;
                        }
                    }

                    .text {
                        margin-top: 3px;
                        width: 100%;
                        text-align: center;
                        font-size: 10px;
                    }
                }

                .has-ticket {
                    display: inline-block;
                    width: 70%;
                    padding: 5px 0;
                    height: 100%;
                    background: #FF621B;
                    border-radius: 0 20px 20px 0;
                    color: #fff;

                    .content {
                        width: 100%;
                        text-align: center;
                        font-size: 10px;

                        .price {
                            vertical-align: bottom;
                            font-size: 14px;
                        }
                    }

                    .text {
                        margin-top: 3px;
                        width: 100%;
                        text-align: center;
                        font-size: 10px;
                    }
                }
            }
        }
    }

</style>
