const {Controller} = require('uni-cloud-router')
const createConfig = require('uni-config-center')
const uniPayConfig = createConfig({pluginId: 'uni-pay'})
const global = require("globalunit");
const wxpay = require("wxpay");
module.exports = class AdminController extends Controller {
	async loadconfig() {
		if (!this.ctx.data.id) {
			return {
				errcode: 10201,
			};
		}
		var GAMENAME = await global.config.get('GAMENAME');
		var config = await this.db.collection(GAMENAME).doc(this.ctx.data.id).get();
		return {
			errcode: 0,
			config: config['data'][0]
		}
	}
	
	
	async loadconfig1() {
		var config = await global.config.get();
		return {
			errcode: 0,
			config: config
		}
	}

	async setconfig() {
		if (!this.ctx.data.json) {
			return {
				errcode: 10201,
			};
		}
		console.log(this.ctx.data.json)
		var data = JSON.parse(this.ctx.data.json);
		console.log("datadata",data)
		var GAMENAME = await global.config.get('GAMENAME');
		for (let key in data) {
			if (!key || !data[key]) {
				continue;
			}
			for (let key1 in data[key]) {
				var obj = {}
				obj[key1] = data[key][key1]
				var res = await this.db.collection(GAMENAME).doc(key).update(obj)
				if(res.updated != 1){
					await this.db.collection(GAMENAME).doc(key).set(obj)
				}
			}

		}

		return {
			errcode: 0
		};
	}
	//取消注销账户
	async openUser() {
		if (!this.ctx.data.uid || !this.ctx.data.openUserId) {
			return {
				errcode: 10001,
			};
		}
	
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.openUserId);
		if (user._id == 0 || user._id != this.ctx.data.openUserId) {
			return {
				errcode: 10005,
			};
		}
		
		var res = await this.ctx.uniID.openAccount({
			uid: user._id,
		});
		console.log("res:-------------- ", res);
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, 'user_login', await user.toparam());
	
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
			}
		};
	}
	// 冻结账号
	async fenghao() {
		console.log("this.ctx.data:--- ",this.ctx.data);
		if (!this.ctx.data.uid || !this.ctx.data.fenghaoid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.fenghaoid);
		if (user._id == 0 || user._id != this.ctx.data.fenghaoid) {
			return {
				errcode: 10005,
			};
		}

		if (user.accountstatus == 0 || user.accountstatus == '0') {
			user.accountstatus = 1;
		} else {
			user.accountstatus = 0;
		}

		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, 'user_login', await user.toparam());

		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
			}
		};
	}
	
	
	// 帮助
	async changehelp() {
		if (!this.ctx.data.title || !this.ctx.data.content || !this.ctx.data.type || !this.ctx.data.caozuo) {
			return {
				errcode: 10001,
			};
		}
		var data = {
			title:this.ctx.data.title,
			content:this.ctx.data.content,
			type:this.ctx.data.type,
			createtime:Math.floor(Date.now() / 1000)
		}
		console.log(this.ctx.data)
		if(this.ctx.data.caozuo == "update"){
			await this.db.collection('helpinfo').doc(this.ctx.data._id).update(data);
		}else if(this.ctx.data.caozuo == "add"){
			console.log("adsdddd")
			await this.db.collection('helpinfo').add(data);
		}else if(this.ctx.data.caozuo == "remove"){
			console.log("adsdddd")
			await this.db.collection('helpinfo').doc(this.ctx.data._id).remove();
		}
	
		return {
			errcode: 0,
			data: {
				
			}
		};
	}
	async changestage() {
		if (!this.ctx.data.json) {
			return {
				errcode: 10201,
			};
		}
		console.log(this.ctx.data.json)
		var data = JSON.parse(this.ctx.data.json);
		await this.db.collection('gameconfig').doc('stage').update(data);
	
		return {
			errcode: 0,
			data: {
				
			}
		};
	}
    
    async changecat() {
    	if (!this.ctx.data.json) {
    		return {
    			errcode: 10201,
    		};
    	}
    	console.log(this.ctx.data.json)
    	var data = JSON.parse(this.ctx.data.json);
    	await this.db.collection('gameconfig').doc('cats').update(data);
    
    	return {
    		errcode: 0,
    		data: {
    			
    		}
    	};
    }
	
	// 冻结账号
	async tixian() {
		if (!this.ctx.data.id || !this.ctx.data.type) {
			return {
				errcode: 10001,
			};
		}
		
		let res = await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).get();
		console.log(res)
		if(res['data'].length<=0){
			return {
				errcode: 10001,
			};
		}
		var data = res['data'][0];
		if(data['status'] != 0 && data['status'] != 3){
			return {
				errcode: 10034,
			};
		}
		var uid = data['uid']
		var amount = data['count']
		var commission = data['commission']
		var realamount = Number(amount) - Number(commission);
		console.log(realamount,'金额')
		var user = await global.UserLogic.loaduser(this.db, uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
        var tixiantype = await global.config.get('tixiantype','type')
		if(this.ctx.data.type == 1){
			// 同意提现
			
            if(tixiantype == 'zhifubao'){
                if (user.isfirstwithdraw == 1) {
                	user.isfirstwithdraw = 0;
                }
                await user.save();
                await user.load();
                var up = await user.toparam();
                // await global.QueueHelper.putLog(this.db, "user_login",up);
                await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({status:1});
                await global.QueueHelper.profitrecord(this.db, user._id, data['count'], up['fen'], '提现成功', 11);
            }else{
                
				const config = {
					appid:uniPayConfig.config('app.weixin.appid') , //公众号id
					mchid:uniPayConfig.config('app.weixin.mchid') , //商户id
					partnerKey: uniPayConfig.config('app.weixin.partnerKey'), //安全密钥
					pfx: wxpay.fs.readFileSync(wxpay.path.resolve(__dirname, "apiclient_cert.p12")),
					notify_url:"",
					spbill_create_ip: 'IP地址'
				};
				
                // const api = new tenpay(config);
                // 调试模式(传入第二个参数为true, 可在控制台输出数据)
                const api = new wxpay.tenpay(config, true);
                
                let date = Date.now();
                let rund = Math.ceil(date / 1000);
                let partner = rund + '' + user.inviteCode;
                console.log(' ceshi jin lai  99999--partner--->' + partner)
                console.log(' 实际金额' + Math.round(realamount*100))
                let result = await api.transfers({
                	partner_trade_no: partner, //订单号
                	openid: user.openid,
                	re_user_name: user.realname, //真实姓名
                	amount: Math.round(realamount*100),
                	desc: '企业付款描述信息'
                });
                console.log(' ceshi jin lai  88888----->')
                console.log(result)
                
                if (result['return_code'] == 'SUCCESS' && result['result_code'] == 'SUCCESS') {
                	if (user.isfirstwithdraw == 1) {
                		user.isfirstwithdraw = 0;
                	}
                	await user.save();
                	await user.load();
                	var up = await user.toparam();
                	// await global.QueueHelper.putLog(this.db, "user_login",up);
                	await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({status:1});
                	await global.QueueHelper.profitrecord(this.db, user._id, data['count'], up['fen'], '提现成功', 11);
                
                } else {
                	return {
                		errcode: 10042,
                	};
                }
            }
		}else if(this.ctx.data.type == 2){
			// 拒绝提现
			await user.shangfen(data['count'],'fen',false,false);
			await user.save();
			await user.load();
			await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({status:2,msg:this.ctx.data.msg});
		}else{
            await this.db.collection('withdrawrecord_log').doc(this.ctx.data.id).update({status:3});
        }
		return {
			errcode: 0,
			data: {
				
			}
		};
	}
}
