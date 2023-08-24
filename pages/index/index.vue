<script setup>
import { computed, reactive, ref } from "vue"
import { onLoad, onUnload, onPullDownRefresh, onReachBottom, onPageScroll } from "@dcloudio/uni-app"
// 点击搜索
const clickSearch = ()=> {
	uni.redirectTo({
	  url: '/pages/member/index/index',
	})
}

// banner
const swiperData = [
	"https://m15.360buyimg.com/mobilecms/jfs/t1/8037/35/16361/183757/626e3799Ee0941589/9d83bafe1dc9555d.jpg!cr_1125x449_0_166!q70.jpg",
	"https://m15.360buyimg.com/mobilecms/jfs/t1/75338/12/22722/73651/637c29aaE6c8e163e/2e9f118f90b1706e.jpg!cr_1053x420_4_0!q70.jpg",
];

// 图片导航
const imgNavData1 = [
	{ "text": "超市", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-cart.c4dccb62.png"},
	{ "text": "数码电器", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-3c.6055bee3.png"},
	{ "text": "新百货", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-j.e2350b65.png"},
	{ "text": "生鲜", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-lanzi.0af9fd2a.png"},
	{ "text": "1小时达", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-dj.9ea61d3a.png"},
	{ "text": "充值缴费", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-cz.952bd102.png"},
	{ "text": "附近好店", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-shop.056fb7a1.png"},
	{ "text": "领劵", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-juan.e48e05cd.png"},
	{ "text": "PLUS会员", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-plus.e0ccc2ea.png"},
	{ "text": "国际进口", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-plus.e0ccc2ea.png"},
]
const imgNavData2 = [
	{ "text": "拍卖", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-pm.12aba202.png"},
	{ "text": "3C", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-sale.9dbea7c0.png"},
	{ "text": "沃爱马", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-wam.57d5339e.png"},
	{ "text": "美妆", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-mzg.39602d5d.png"},
	{ "text": "旅行", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-lx.e94a001e.png"},
	{ "text": "二手", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-es.9e0a7c09.png"},
	{ "text": "全部", "src": "http://demo.template-vant-vue.liqingsong.cc/assets/grid-all.beb08680.png"},
]


// 商品列表
const pro = reactive({
	list: [],
	loading: false,
	finished: false
})
const loadMoreStatus = computed(()=> pro.loading ? 'loading' : (pro.finished? 'no-more': 'more'))
const getList = () => {
	if(pro.loading || pro.finished) {
		return;
	}
	pro.loading = true;
	// 异步更新数据
	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	setTimeout(() => {
		for (let i = 0; i < 10; i++) {
			pro.list.push(pro.list.length + 1);
		}

		// 加载状态结束
		pro.loading = false;

		// 数据全部加载完成
		if (pro.list.length >= 100) {
			pro.finished = true;
		}
	}, 1000);
};

onLoad(()=> {
	// 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
	console.log("home onLoad")
	getList();
})
onUnload(()=> {
	// 监听页面卸载
	console.log("home onUnload")
})

onPullDownRefresh(()=> {
	// 监听用户下拉动作，一般用于下拉刷新
	console.log("onPullDownRefresh 监听用户下拉动作")
	getList();
})

onReachBottom(()=> {
	// 页面滚动到底部的事件（不是scroll-view滚到底）
	console.log("onReachBottom 页面滚动到底部")
	getList();
})


const scrollTop = ref(0);
onPageScroll((e)=> {
	// console.log("onPageScroll 页面滚动", e)
	scrollTop.value = e.scrollTop || 0;
})

</script>
<template>
	<uni-nav-bar  :border="false" :fixed="true"  status-bar left-width="0"  color="#FFFFFF" background-color="#c82519">
		<view class="search-input-box" @click="clickSearch">
			<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
			<view  class="search-input">联想笔记本</view>
		</view>
	</uni-nav-bar>
	
	<view class="home-swiper">
		<view class="home-swiper-bg"></view>
		<swiper class="swiper" circular indicator-dots autoplay indicator-active-color="#c82519" :interval="3000">
			<swiper-item v-for="item in swiperData" :key="item">
				<image class="swiper-img" :src="item" />
			</swiper-item>			
		</swiper>
	</view>
	
	<swiper class="home-grid" circular indicator-dots indicator-active-color="#c82519">
		<swiper-item>
			<view class="flex-grid">
				<view v-for="(item, index) in imgNavData1" :key="index" class="flex-grid-item" style="flex-basis: 20%;">
					<image :src="item.src"  style="width: 40px; height: 40px;"/>
					<text>{{item.text}}</text>
				</view>
			</view>
		</swiper-item>	
		<swiper-item>
			<view class="flex-grid">
				<view v-for="(item, index) in imgNavData2" :key="index" class="flex-grid-item" style="flex-basis: 20%;">
					<image :src="item.src"  style="width: 40px; height: 40px;"/>
					<text>{{item.text}}</text>
				</view>
			</view>
		</swiper-item>
	</swiper>
	
	<view>
		
		<view class="flex-grid">
			<view v-for="item in pro.list" :key="item" class="flex-grid-item" style="flex-basis: 50%;">
				<view class="pro-item">
					<image class="img" src="https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/90360/23/31969/135998/636485dcEd3e41a71/8c4c71d097a3c943.jpg!q70.dpg.webp" />
					<text class="title ft-ellipsis--l2">{{ item }}这是一段最多显示两行的文字，多余的内容会被省略这是一段最多显示两行的文字，多余的内容会被省略</text>
					<text class="price">￥<text>6498</text>.00</text>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="loadMoreStatus" :contentText="{contentdown: '下滑加载更多'}"></uni-load-more>
	</view>
	
	
	
	
	<back-top :scroll-top="scrollTop" />
	<nav-tabbar :index="0" />
</template>

<style lang="scss" scoped>
	$nav-height: 30px;
	.search-input-box {
		width: 100%;
		display: flex;
		background-color: #f8f8f8;
		height: $nav-height;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 10rpx 36rpx 0 -10px;
		line-height: $nav-height;
		
		.search-input {
			height: $nav-height;
			line-height: $nav-height;
			padding: 0 5px;
			font-size: 12px;
			background-color: #f8f8f8;
			color: #545454;
		}
	}

	.home-swiper {
		position: relative;
		height: 143px;
		overflow: hidden;
		.home-swiper-bg {
			position: absolute;
			top: 0;
			left: -25%;
			width: 150%;
			height: 101px;
			background-image: -webkit-gradient(linear, left bottom, left top, from(#f1503b), color-stop(50%, #c82519));
			background-image: -webkit-linear-gradient(bottom, #f1503b, #c82519 50%);
			background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
			border-bottom-right-radius: 100%;
			border-bottom-left-radius: 100%;
		}
		.swiper {
			width: 90%;
			height: 140px;
			margin: 0 auto;
			border-radius: 6px;
			overflow: hidden;
			.swiper-img {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	.home-grid {
		padding-bottom: 15px;
		height: 180px;
	}

</style>
