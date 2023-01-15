"use strict";
const config = require("../../utils/config");
const utils = require("../../utils/utils");
const friendactivemodel = require("../../model/friendactivemodel");
const UserLogic = require("../userlogic");
const DialytaskLogic = require("../dialytasklogic");
module.exports = class friendactivelogic {

    static async loadfriendactive(db, uid) {
        var u = new friendactivemodel(db, uid);
        await u.load();
        return u;
    }

    // 增加好友
    static async addcount(db, uid, keyname) {
        var friendactive = await this.loadfriendactive(db, uid);
        friendactive[keyname] += 1;
        var condition = await config.get("friendactiveteam");
        var user = await UserLogic.loaduser(db, uid);
        // user[keyname] += 1;
        // 旅行团收益
        if (friendactive[keyname] >= condition[keyname]) {
            friendactive[keyname] = 0;
            // 为上级赚2分钱    1个直推  =  2个扩散
            if (user.shangji != 0 && user.isauthentication == 1 && user.maxlvl >= 8) {
                // 今日活跃人数
                var todaybegin = utils.today();
                var tomorrowbegin = utils.tomorrow();
                var _table = 'today_' + todaybegin + user._id;
                // 根据今日创建新表
                await db.collection('huoyuerenshu').doc(_table).set({
                    uid: user._id,
                    active: 1,
                    time: Math.floor(Date.now() / 1000),
                    parent: user.shangji,
                    endtime: tomorrowbegin,
                    todaybegin:todaybegin
                });

                var sjuser = await UserLogic.loaduser(db, user.shangji);
                if (sjuser.isauthentication == 1 && sjuser.maxlvl >= 8) {
                    if (keyname == 'friendcount') {
                        var cunzai = await db.collection('uni-id-users').where({
                            inviter_uid: {
                                0: user.shangji,
                            },
                            _id: user._id,
                        }).get();

                        if (!cunzai.data || cunzai.data.length <= 0) {
                            await db.collection('uni-id-users').doc(user._id).update({
                                inviter_uid: {
                                    0: user.shangji,
                                },
                            });
                        }

                        
                    }
                    var u = await sjuser.toparam();
                    var stages = await config.get("stage");
                    var stage = stages[sjuser.curstage - 1];
                    //stage = UserLogic.calnextstage(u['friendfen']);
                    var beilv = stage['beilv'];
                    var v = await config.get("friendprofit", keyname + "profit");
                    v = v * beilv * 2
                    if (v <= 0.01) {
                        v = 0.01;
                    }
                    await sjuser.shangfriendfen(v,'friendfen',user._id);
                    await sjuser.save();
                    await sjuser.load();
                    var task = await DialytaskLogic.loadtask(db, user.shangji);
                    if (task._id == 0) {
                        task.uid = user.shangji;
                        task._id = await DialytaskLogic.getkey(user.shangji);
                        await task.save();
                    }
                    await task.shangtodayfen(v, "todayzhituifen");
                }

                if (sjuser.shangji != 0) {
                    // 今日活跃
                    // 今日活跃人数
                    var todaybegin = utils.today();
                    var tomorrowbegin = utils.tomorrow();
                    var _table = 'today_' + todaybegin;
                    // 根据今日创建新表
                    try {
                        //阿里云
                        await db.collection(_table).doc(user._id).set({
                            uid: user._id,
                            active: 1,
                            time: Math.floor(Date.now() / 1000),
                            parent: user.shangji,
                            endtime: tomorrowbegin,
                        });
                    } catch (e) {
                        //腾讯云
                        await db.createCollection(_table);
                        await db.collection(_table).doc(user._id).set({
                            uid: user._id,
                            active: 1,
                            time: Math.floor(Date.now() / 1000),
                            parent: user.shangji,
                            endtime: tomorrowbegin,
                        });
                    }

                    var ssjuser = await UserLogic.loaduser(db, sjuser.shangji);
                    if (ssjuser.isauthentication == 1 && ssjuser.maxlvl >= 8) {
                        if (keyname == 'friendcount') {
                            var cunzai = await db.collection('uni-id-users').where({
                                inviter_uid: {
                                    1: sjuser.shangji,
                                },
                                _id: user._id,
                            }).get();

                            if (!cunzai.data || cunzai.data.length <= 0) {
                                await db.collection('uni-id-users').doc(user._id).update({
                                    inviter_uid: {
                                        1: sjuser.shangji,
                                    },
                                });
                            }
                        }

                        var u = await ssjuser.toparam();
                        var v = await config.get("friendprofit", keyname + "profit");
                        //stage = UserLogic.calnextstage(u['friendfen']);
                        var stages = await config.get("stage");
                        var stage = stages[ssjuser.curstage - 1];
                        var beilv = stage['beilv'];
                        v = v * beilv
                        if (v <= 0.01) {
                            v = 0.01;
                        }
                        await ssjuser.shangfriendfen(v,'friendfen',user._id);
                        await ssjuser.save();
                        await sjuser.load();
                        // u = ssjuser.toparam();
                        // Log.var_dump(array("扩散fen"=>v, "beilv"=>beilv, "friendfen"=>u['friendfen'], "bide"=>u['bide'], "keyname"=>keyname));
                        var task = await DialytaskLogic.loadtask(db, sjuser.shangji);
                        if (task._id == 0) {
                            task.uid = sjuser.shangji;
                            task._id = await DialytaskLogic.getkey(sjuser.shangji);
                            await task.save();
                        }
                        await task.shangtodayfen(v, "todaykuosanfen");
                    }
                }
            }
        }

        await user.save();
        await friendactive.save();
    }

}
