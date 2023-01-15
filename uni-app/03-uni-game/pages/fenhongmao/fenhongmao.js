export default {
	data() {
		return {
			jindu: 45,
			option: {
				xAxis: {
					show: false,
					data: ['Mon', 'Tue', 'Wed', 'Thu'],
				},
				yAxis: {
					show: false
				},
				series: [{
					type: 'line',
					symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAABGCAYAAACHZ2ccAAAFNklEQVRoQ92baaydUxSGn1eLGiumRBDzLBF/DKlI1RTRtErFrA1BK1HRUEEIoSL6o8QUNTRBqVlJEYmQEGIqIYaI2Q9jjFEEXfLWvnF7cu8537S/m5719357eO5ae017H9GSRMTagCT90caSamMRrxERGwKjJP3Yxpptgm0FrCXpk34D2xPYQNLL/QZ2MLA5sFhS5IZr0xRPBnYE5kr6q5/ALgb2BqZL+q2fwG4FDgQmSPqqL8AiYg3gEeAQw0la1i9gWwCPAvsCR0la0i9gBwAPJ694oaRr+wXsDGBBgrk3OZCsnjG7u4+IUcAtgOEsHwDHSXo7p9baANsZeADYaxDIqZLuXt3BHJjvcmY/COQOYIakv3PBZdVYRKyZztb0DoCPgWMlvbm6gu2XzHDrIQBmS5q/2oFFhK3hMuDyYTb/EjBF0rc54LKZYkTYaTwG7NZl49Mk+fw1LjnBLgGu6rHjF4FJOarqLGAR4aLS2tqhgCrOluQ416g0DpY84fXAzII7fReYLMmesjHJATYFWASsU2KX1tisJuNao2ARsSXwRCooS3DhvNHZyOIyg7p92xhYRIxJwfiUipv7EJgq6Z2K41cZ1iSYY9YVNTf1XIL7oeY8q+RvleeKiNOBm903rDzJ/wNtjmdK+rXOXLU1FhE2vZvcM6yzkY6xTpLPqwNXCywi7NJdDa/fINTAVC5rLpD0TZW5K4GlPvz5wKVVFi0x5mngIklvlRiz8tPSYBGxDzAHOKbsYhW/fx+4UtJ9ZcYXBosIlx6GmQVsV2aRBr51QXo7sFDSq0Xm6wkWEc73JgAnAuOLTJrxG6ddbgYtlfRK1wCd6iY3NEcDvpyzI9gU2Aaw2R2a+oEZ91t66k8Bx7znAQf2rwGHh99hZRazQhHh2LMR4Kams/L9gcOAnUovNzIDfgaeTZB2Mob+yWBuj60H+MbRud626VZkD2DXCnlfW3ifA27h2bl8BNhMvwS+B5Z3PWOpCnbfYipwJGCTHWl5PbXLbYbLhrvT7uk8TBERY4EjgNPSmRsJOGvF3eQlknyuukohsIEZIsLncBowG9is1+QN/t0xbL6k14rOWQpsEKCdizN5m2lOsWPwOgvKXhZWAkvm6fh2HTAxE9lntgxJvn4qLZXBEpzj3Y2+ZCi9cvcBvriYKckOopLUAktwjoG3Jc9ZaRMdg+y2fU/t1lxlqQ2W4DYBHgQOqryT/wZ+Z+ck6ama85TP7odbMCIczH1ruXvFTfntx1mSrP3a0ojGBnYREZOBeyoWnj6r50paUZuqSj3WbdGUUM91cVhycy5FJkqyKTYijWosnTd7yqWpMiiyyeUuiZp+SdA4WIJzbmmTdBnUS/yw5ZymnyHlAjPQQuCEHlRfpDuyxh+0ZAFLWjscuB9wAj2cXO2GUFMOY/AiOcGstTtTS2EoMGvraElv9LLVKn/PBlbgrN2QcsEsLwdyg20MPDRERvKLz5+kJ6too8iYrGBJa26szuvYjBuhfp1jwCzSBti45ETcTxmQOZI6YRsFbANs3dQLdLpl8fOH4yW5fZZNsoMlc3SKZddueQY4SZK7SdmkLTBX2b73cptvniT3/rNKW2C7pJLGvcrsL9/8H2sLzMH68fQmeLykF7Kqqy2wdM6cFPtHBePa+BlIKxpLYNekUsYPw9xWyyptgs1ID8Ycw/7MStWyKU5Klx5ufv7TT2B+cz9WkuNYdmnTFLcHxkh6LztVy6bo3uPoqs8byv4z2tSYc0b/RjP7L5FaC9DJ3fuO22RZCstOjf4L64mTYkGdhN4AAAAASUVORK5CYII=',
					symbolSize: 15,
					itemStyle: {
						borderWidth: 3,
						color: 'white',
					},
					label: {
						show: true,
						formatter: '{b}',
						fontSize: 14,
						lineHeight: 40
					},
					lineStyle: {
						color: '#6EE5FF',
						width: 1,
						type: 'solid'
					},
					data: [{
							value: 335,
							name: '好友数量',
						},
						{
							value: 679,
							name: '猫合成次数'
						},
						{
							value: 1548,
							name: '看视频次数'
						},
						{
							value: 148,
							name: '喵喵团收入'
						}
					],
				}]
			}
		}
	},
	methods: {
		onViewClick(options) {
			console.log(options)
		},
		changeOption() {
			const data = this.option.series[0].data
			// 随机更新示例数据
			data.forEach((item, index) => {
				data.splice(index, 1, Math.random() * 40)
			})
		},
		back() {
			uni.switchTab({
                url: '/pages/index/index?index=0',
            });
		},
		share(){
			uni.navigateTo({
				url: '/pages/yaoqingma/yaoqingma?show=1',
			});
		},
		fenhongmao(){
			var self = this
			self.$refs.popup.open()
		},
		close(){
			var self = this
			self.$refs.popup.close()
		},
	},
	onLoad(option) {
	    const jindu = Number(option.jindu);
		if(jindu>100){
			jindu = 100
		}
		this.jindu = Number(jindu)
	},
}
