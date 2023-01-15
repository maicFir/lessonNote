"use strict";
const config = require("../../utils/config");
const QueueHelper = require("../../utils/queuehelper");
const UserLogic = require("../userlogic");
const XSCatLogic = require("../xscatlogic");

module.exports = class roomlogic {
	static async loadroom(db, uid, city) {
		const UserLogic = require("../userlogic");
		var a = {};
		var room = [];
		var user = await UserLogic.loaduser(db, uid);
		console.log("用户信息",user)
		var now = Math.floor(Date.now() / 1000);
		for (var i = 1; i <= 12; i++) {
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			console.log("等级",s)
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			// 新增分红
			if (fen > 0 && expiretime != -1 && (now >= expiretime)) {
				// 该到期分红
				s = 0;
				user['poscatlvl' + i] = 0
				user['posfen' + i] = 0
				user['posexpiretime' + i] = -1
				await user.save()
				await user.shangfen(fen, "fen", true,true);
				var xscat = await XSCatLogic.loadxscat(db, uid);
				await XSCatLogic.setinfo(db, uid, expiretime, fen);
				await user.load();
				var u = await user.toparam();
				await QueueHelper.profitrecord(db, uid, fen, u.fen, '限时金色招财猫分红', 2);
			}

			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await config.get('cats', 'cat' + s);
				var persec = cat['cal' + city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);

		}
		return room
	}

	// 格子里猫的数量
	static async calcatcount(db, uid, user) {
		var count = 0;
		for (var i = 1; i <= 12; i++) {
			var s = user['poscatlvl' + i];
			s = parseInt(s);

			if (s != 0 && s != 138 && s != 1038) {
				count++;
			}
		}
		return count;
	}

	// 所有格子的每秒产币总和
	static async totalcal(db, uid, city, user) {
		var totalcal = 0;
		for (var i = 1; i <= 12; i++) {
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			if (s > 0) {
				var k = "cat" + s;
				var cal = await config.get("cats", k, "cal" + city);
				totalcal += parseInt(cal);
			}
		}
		console.log("totalcal res:", totalcal);
		return totalcal;
	}

	static async findpos(db, uid, user) {
		for (var i = 1; i <= 12; i++) {
			var s = user['poscatlvl' + i];
			s = parseInt(s);

			if (s <= 0) {
				return i;
			}
		}
		return null;
	}

	static async move(db, uid, pos1, pos2) {
		const now = Math.floor(Date.now() / 1000);
		try {


			const UserLogic = require("../userlogic");
			var user = await UserLogic.loaduser(db, uid);
			if (user._id == 0) {
				return {
					ok: 'usererr'
				};
			}
			let cursor1 = {
				"catlvl": user['poscatlvl' + pos1],
				"expiretime": user['posexpiretime' + pos1],
				"fen": user['posfen' + pos1]
			}

			let cursor2 = {
				"catlvl": user['poscatlvl' + pos2],
				"expiretime": user['posexpiretime' + pos2],
				"fen": user['posfen' + pos2]
			}


			let a1 = cursor1.catlvl;
			let a2 = cursor2.catlvl;
			let ttl1 = cursor1.expiretime == -1 ? cursor1.expiretime : cursor1.expiretime - now;
			let ttl2 = cursor2.expiretime == -1 ? cursor2.expiretime : cursor2.expiretime - now;
			let fen1 = cursor1.fen;
			let fen2 = cursor2.fen;
			//to坑位没有 from坑位有
			if (a2 <= 0 && a1 > 0) {
				let data = {}
				//失效性
				if (ttl1 > 0) {
					user['poscatlvl' + pos2] = a1
					user['posexpiretime' + pos2] = now + ttl1
					user['posfen' + pos2] = fen1
				} else {
					if (a1 == 138) {
						// 等同于删除
						user['poscatlvl' + pos2] = 0
						user['posexpiretime' + pos2] = -1
						user['posfen' + pos2] = 0
					} else {
						user['poscatlvl' + pos2] = a1
						user['posfen' + pos2] = fen1
					}
				}

				user['poscatlvl' + pos1] = 0
				user['posexpiretime' + pos1] = -1
				user['posfen' + pos1] = 0
				await user.save();
				return {
					ok: 'ok',
					user:user
				};

			} else if (a2 > 0 && a1 > 0) { //to坑位有 from坑位有
				let data = {}
				if (ttl2 > 0) {
					user['poscatlvl' + pos1] = a2
					user['posexpiretime' + pos1] = now + ttl2
					user['posfen' + pos1] = fen2
				} else {
					if (a2 == 138) {
						// 等同于删除
						user['poscatlvl' + pos1] = 0
						user['posexpiretime' + pos1] = -1
						user['posfen' + pos1] = 0
					} else {
						user['poscatlvl' + pos1] = a2
						user['posfen' + pos1] = fen2
						user['posexpiretime' + pos1] = cursor2.expiretime
					}
				}

				if (ttl1 > 0) {
					user['poscatlvl' + pos2] = a1
					user['posexpiretime' + pos2] = now + ttl1
					user['posfen' + pos2] = fen1
				} else {
					if (a1 == 138) {
						// 等同于删除
						user['poscatlvl' + pos2] = 0
						user['posexpiretime' + pos2] = -1
						user['posfen' + pos2] = 0
					} else {
						user['poscatlvl' + pos2] = a1
						user['posfen' + pos2] = fen1
						user['posexpiretime' + pos2] = cursor1.expiretime
					}
				}
				await user.save();
				return {
					ok: 'ok',
					user:user
				};

			} else { // 未知情况
				return {
					ok: 'ng'
				};
			};


		} catch (e) {
			return {
				ok: 'ng'
			};
		}
	}

	static async setpos(db, uid, pos, val, expire = -1, fen = 0) {
		try {
			const UserLogic = require("../userlogic");
			var user = await UserLogic.loaduser(db, uid);
			var catlvl = user['poscatlvl' + pos]
			if (catlvl <= 0) {
				user['poscatlvl' + pos] = val
				user['posexpiretime' + pos] = expire
				user['posfen' + pos] = fen
				await user.save();
				return {
					ok: 'ok'
				};
			} else {
				return {
					ok: 'ng'
				};
			}
		} catch (e) {
			return {
				ok: 'ng'
			};
		}
	}




	static async hecheng(db, uid, pos1, pos2, val1, val2, newcat, bonuscat = -1, expire = -1, fen = 0) {
		var begin = new Date().getTime()
		console.log("参数", pos1 + '--' + pos2 + '--' + val1 + '--' + val2 + '--' + newcat)
		if (!pos1 || !pos2 || !val1 || !val2 || !newcat) {
			return {
				ok: 'ng'
			};
		};
		newcat = parseInt(newcat)
		const now = Math.floor(Date.now() / 1000);
		const UserLogic = require("../userlogic");
		var user = await UserLogic.loaduser(db, uid);
		try {

			let cursor1 = {
				"catlvl": user['poscatlvl' + pos1],
				"expiretime": user['posexpiretime' + pos1],
				"fen": user['posfen' + pos1]
			}

			let cursor2 = {
				"catlvl": user['poscatlvl' + pos2],
				"expiretime": user['posexpiretime' + pos2],
				"fen": user['posfen' + pos2]
			}

			let a1 = cursor1.catlvl;
			let a2 = cursor2.catlvl;
            if((a1==938 && a2==838) || (a2==938 && a1==838)){
            	user['poscatlvl' + pos1] = 0
            	user['posexpiretime' + pos1] = -1
            	user['posfen' + pos1] = 0
                
                user['poscatlvl' + pos2] = 0
                user['posexpiretime' + pos2] = -1
                user['posfen' + pos2] = 0
                
                await user.save();
                return {
                	ok: 'ok'
                };
            }
			//判断各种可能传错参数的可能性
			if (a1 != val1 || a2 != val2 || a1 != a2 || val1 != val2 || a1 <= 0 || a2 <= 0) {
				return {
					ok: 'ng'
				};
			}

			// 删除from坑位 （重置）
			user['poscatlvl' + pos1] = 0
			user['posexpiretime' + pos1] = -1
			user['posfen' + pos1] = 0
			if (newcat > 0) {
				user['poscatlvl' + pos2] = newcat
				user['posexpiretime' + pos2] = -1
				user['posfen' + pos2] = fen
			} else {
				user['poscatlvl' + pos2] = 0
				user['posexpiretime' + pos2] = -1
				user['posfen' + pos2] = fen
			}
			if (bonuscat > 0) {
				if (expire >= 0) {
					user['poscatlvl' + pos1] = bonuscat
					user['posexpiretime' + pos1] = now + expire
					user['posfen' + pos1] = fen
				} else {
					user['poscatlvl' + pos1] = bonuscat
					user['posfen' + pos1] = fen
				}
			}
			await user.save();
			return {
				ok: 'ok'
			};

		} catch (e) {
			return {
				ok: 'ng'
			};
		}
	}
}
