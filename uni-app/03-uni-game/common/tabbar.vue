
<template>
	<div>
		<view class="tabbar">
			<block v-for="(item,index) in tabList" :key="index">
				<view class="navigator" :class="currentTabIndex == index ? 'on' : ''" @tap="switchTab(index)">  
					<view class="icon">  
						<image :src="item.iconcheck" class="iconimg" mode="widthFix" v-if="currentTabIndex == index"></image>
						<image :src="item.icon" class="iconimg" mode="widthFix" v-else></image>
					</view>  
					<view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">{{item.text}}</view>  
				</view>  
			</block>
		</view>
	</div>
</template>
<script>  
    export default {  
        data() {  
            return {  
                tabList: [  
                    {  
                        icon: require('../static/tabbar/index.png'), 
						iconcheck: require('../static/tabbar/indexcheck.png'), 
                        text: '首页',  
                    },  
                    {  
                        icon: require('../static/tabbar/mmt.png'),  
						iconcheck: require('../static/tabbar/mmtcheck.png'), 
                        text: '喵喵团',  
                    },  
                    {  
                        icon: require('../static/tabbar/wode.png'),  
						iconcheck: require('../static/tabbar/wodecheck.png'), 
                        text: '我的',  
                    }  
                ],  
                currentTabIndex: this.current  
            }  
        },  
        props: {  
            current: { type: [Number, String], default: 0 },  
            backgroundColor: { type: String, default: '#ffffff' },  
            color: { type: String, default: '#888888' },  
            tintColor: { type: String, default: '#FD7155' }  
        },  
        methods: {  
            switchTab(index){  
                this.currentTabIndex = index  
                this.$emit('click', index)  
            }  
        },
    }  
</script>

<style>
.tabbar{
	width: 100%;
	height: 55px;
	position: fixed;
	left: 0;
	bottom: 0;
}
.navigator{
	width: 33.3333%;
	height: 100%;
	float: left;
	text-align: center;
}
.iconimg{
	width: 56rpx;
	height: 45rpx;
}
.icon{
	height: 48rpx;
}
</style>
