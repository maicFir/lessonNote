'use strict';
const global = require("globalunit");
const db = uniCloud.database();
exports.main = async (event, context) => {
	function sleep(d) {
		for (var t = Date.now(); Date.now() - t <= d;);
	}
	var res = await db.collection('fenhongcatinfo').get();
	var data = res.data;
	for (var i = 0; i < data.length; i++) {
		console.log(data[i]);
		var user = await global.UserLogic.loaduser(db, data[i].uid);
		if (user._id != 0) {
			user.jianzhi = 0;
			await user.save();

			var fenhongcat = await global.FenhongCatLogic.loadfenhongcat(db, user._id);
			fenhongcat.today = 0;
			await fenhongcat.save();
			await global.FenhongCatLogic.calfenhong(db, user._id);
		}

		sleep(10);
	}
};
