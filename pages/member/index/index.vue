<script setup>
	import { computed, reactive, ref } from "vue"
	import { onLoad, onUnload, onReachBottom, onPageScroll } from "@dcloudio/uni-app"
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
		console.log("member index onLoad")
		getList();
	})
	onUnload(()=> {
		// 监听页面卸载
		console.log("member index onUnload")
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
	<layout-security>
		<uni-nav-bar  :border="false" fixed  status-bar background-color="#f6f6f6" />
		<view class="memeber-header">
			<view class="face">
				<image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
			</view>
			<view class="info">
				<view class="name">张三</view>
				<view>
					<uni-tag text="会员中心" size="mini"></uni-tag>
				</view>
			</view>
			<view class="set">
				<navigator url="/pages/member/set/set">
					<uni-icons type="gear" size="25"></uni-icons>
				</navigator>
			</view>
		</view>
		
		<uni-card :is-shadow="false" :border="false" padding="0">
			<view class="group-card-title">
				<view class="text">我的订单</view>
				<view class="more">
					<navigator url="/pages/index/index">全部</navigator>
					<uni-icons type="forward" size="12"></uni-icons>
				</view>
			</view>
			
			<view class="flex-grid">
				<view class="flex-grid-item" style="flex-basis: 20%;">
					<uni-badge :text="0" absolute="rightTop"  size="small">
						<uni-icons type="scan" size="30"></uni-icons>
					</uni-badge>
					<text>待付款</text>
				</view>
				
				<view class="flex-grid-item" style="flex-basis: 20%;">
					<uni-badge :text="1" absolute="rightTop"  size="small">
						<uni-icons type="paperplane" size="30"></uni-icons>
					</uni-badge>
					<text>待发货</text>
				</view>
				
				<view class="flex-grid-item" style="flex-basis: 20%;">
					<uni-badge :text="3" absolute="rightTop"  size="small">
						<uni-icons type="gift" size="30"></uni-icons>
					</uni-badge>
					<text>待收货</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 20%;">
					<uni-badge :text="10" absolute="rightTop"  size="small">
						<uni-icons type="chatbubble" size="30"></uni-icons>
					</uni-badge>
					<text>待评价</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 20%;">
					<uni-badge :text="0" absolute="rightTop"  size="small">
						<uni-icons type="vip" size="30"></uni-icons>
					</uni-badge>
					<text>退款/售后</text>
				</view>
			</view>
		</uni-card>
		
		<uni-card :is-shadow="false" :border="false" padding="0">
			<view class="group-card-title">
				<view class="text">我的权益</view>
			</view>
			
			<view class="flex-grid">
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<text class="uni-h4">1</text>
					<text>红包</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<text class="uni-h4">1</text>
					<text>优惠价</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<text class="uni-h4">200</text>
					<text>金币</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<text class="uni-h4">1001</text>
					<text>积分</text>
				</view>
			</view>
		</uni-card>
		
		
		<uni-card :is-shadow="false" :border="false" padding="0">			
			<view class="flex-grid">
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<uni-icons type="staff" size="30"></uni-icons>
					<text>我的拼团</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<uni-icons type="calendar" size="30"></uni-icons>
					<text>我的秒杀</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<uni-icons type="star" size="30"></uni-icons>
					<text>我的收藏</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<uni-icons type="location" size="30"></uni-icons>
					<text>收货地址</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<uni-icons type="chat" size="30"></uni-icons>
					<text>消息</text>
				</view>				
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<uni-icons type="headphones" size="30"></uni-icons>
					<text>客服</text>
				</view>
				<view class="flex-grid-item" style="flex-basis: 25%;">
					<uni-icons type="info" size="30"></uni-icons>
					<text>关于我们</text>
				</view>
			</view>
		</uni-card>
		

		
		<view>
			<uni-load-more :contentText="{contentdown: '为您推荐'}"></uni-load-more>
			
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
		<nav-tabbar :index="1" />
	</layout-security>
</template>

<style lang="scss" scoped>
	.memeber-header {
		display: flex;
		padding: 0 20px;
		.face {
			width: 60px;
			image {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
		}
		.set {
			width: 30px;
			text-align: right;
		}
		.info {
			flex: 1;
			.name {
				font-size: 18px;
			}
		}
	}
</style>
