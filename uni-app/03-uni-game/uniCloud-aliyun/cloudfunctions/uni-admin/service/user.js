const {
	Service
} = require('uni-cloud-router')
module.exports = class UserService extends Service {
	async login({
		username,
		password
	}) {
		const res = await this.ctx.uniID.login({
			username,
			password,
			needPermission: true
		})
		if (res.code) {
			return res
		}
		await this.checkToken(res.token, {
			needPermission: true,
			needUserInfo: false
		})
		if (this.ctx.auth.role.includes('admin')) {
			return res
		}
		const navMenu = await this.service.menu.getMenu()
		if (navMenu.length) {
			return res
		}
		return {
			code: 10001,
			message: '该账号暂无权限登录'
		}
	}

	async logout(token) {
		return await this.ctx.uniID.logout(token)
	}

	async checkToken(token) {
		const auth = await this.ctx.uniID.checkToken(token, {
			needPermission: true,
			needUserInfo: false
		})
		if (auth.code) {
			// 校验失败，抛出错误信息
			this.ctx.throw('TOKEN_INVALID', `${auth.message}，${auth.code}`)
		}
		this.ctx.auth = auth // 设置当前请求的 auth 对象
	}

	async hasAdmin() {
		const {
			total
		} = await this.db.collection('uni-id-users').where({
			role: 'admin'
		}).count()

		return !!total
	}
	
	async getCurrentUserInfo(field = []) {
		return this.ctx.uniID.getUserInfo({
			uid: this.ctx.auth.uid,
			field
		})
	}
}
