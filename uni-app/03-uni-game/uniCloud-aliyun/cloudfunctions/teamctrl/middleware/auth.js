const globalunit = require('globalunit')
module.exports = (options) => {
    // 返回中间件函数
    return async function auth(ctx, next) {
        // 校验 token
		var token = ctx.event.uniIdToken ? ctx.event.uniIdToken : ctx.data.uniIdToken;
        const auth = await ctx.uniID.checkToken(token);
        if (auth.code) {
            // 校验失败，抛出错误信息
            ctx.throw('TOKEN_INVALID', `${auth.message}，${auth.code}`);
        }
		
		ctx.data.uid = auth.uid;
        await next() // 执行后续中间件
    }
}
