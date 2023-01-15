<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="content" label="留言内容" required>
				<textarea @input="binddata('content', $event.detail.value)" class="uni-textarea-border"
					v-model="formData.content" trim="right"></textarea>
			</uni-forms-item>
			<uni-forms-item name="imgs" label="图片列表">
				<uni-file-picker file-mediatype="image" :limit="6" return-type="array" v-model="formData.imgs">
				</uni-file-picker>
			</uni-forms-item>
			<uni-forms-item name="contact" label="联系人">
				<uni-easyinput v-model="formData.contact" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="mobile" label="联系电话" required >
				<uni-easyinput v-model="formData.mobile" trim="both" maxlength="11"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="qq" label="QQ号" required>
			  <uni-easyinput v-model="formData.qq" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="weixin" label="微信">
			  <uni-easyinput v-model="formData.weixin" trim="both"></uni-easyinput>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="default" class="uni-button" @click="submit">提 交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/opendb-feedback.js';
	console.log(validator);
	const db = uniCloud.database();
	const dbCollectionName = 'opendb-feedback';

	function getValidator(fields) {
		let result = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				result[key] = validator[key]
			}
		}
		return result
	}

	export default {
		data() {
			let formData = {
				"content": "",
				"imgs": [],
				"contact": "",
				"mobile": "",
				"qq":"",
				"weixin":""
			}
			return {
				formData,
				formOptions: {},
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					console.log("res: ----",res);
					this.submitForm(res)
				}).catch(() => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '提交成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}

	.uni-button {
		/* width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0; */
		background-color: #ed7855!important;
		width: 626rpx;
		height: 88rpx;
		border-radius: 88rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 100rpx;
		margin: auto;
		color: #FFFFFF!important;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 88rpx;
		text-align: center;
	}
</style>
