(() => {

  const $ = id => document.getElementById(id);
  const appDomMovie = $('movie');
  const gameDom = $('wang');
  // appDom.innerHTML = 'hello webpack for wds,';
  // https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=0
  // 豆瓣电影
  const featchMovie = async () => {
    const { data = [] } = await (await fetch('/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=0')).json()
    // console.log(data)
    const divDom = document.createElement('div');
    let str = '';
    data.forEach(item => {
      const { title, rate } = item;
      str += ` <span>${title},${rate}</span>`
    })
    divDom.innerHTML = str;
    appDomMovie.appendChild(divDom);
  }
  featchMovie();

  const wangzherongyao = async () => {
    const divDom = document.createElement('div');
    // https://apps.game.qq.com/cmc/cross?serviceId=18&filter=tag&sortby=sIdxTime&source=web_pc&limit=20&logic=or&typeids=1%2C2&exclusiveChannel=4&exclusiveChannelSign=8a28b7e82d30142c1a986bb7acdcc068&time=1655732988&tagids=931
    // 王者荣耀官网
    const { data: { items = [] } } = await (await fetch('/cmc/cross?serviceId=18&filter=tag&sortby=sIdxTime&source=web_pc&limit=20&logic=or&typeids=1%2C2&exclusiveChannel=4&exclusiveChannelSign=8a28b7e82d30142c1a986bb7acdcc068&time=1655732988&tagids=931')).json()
    let str = '';
    console.log(items)
    items.forEach(item => {
      const { sTitle, sIMG } = item;
      str += `<div>
          <img src=${sIMG} />
          <div>${sTitle}</div>
      </div>`
    });
    divDom.innerHTML = str;
    gameDom.appendChild(divDom);
  }
  wangzherongyao()


})()