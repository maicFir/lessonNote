const globalunit = require('globalunit')
module.exports = () => {
    // 返回中间件函数
    return async function body(ctx, next) {
        await next() // 执行后续中间件
		if(ctx.body.errcode && ctx.body.errcode!=0){
			ctx.body.errmsg = await globalunit.config.get('errmsg','e'+ctx.body.errcode)
		}
    }
}
