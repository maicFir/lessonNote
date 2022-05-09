const resPonseSuccess = (msg) => {
  return {
    code: 0,
    message: 'success',
    msg,
    data: []
  }
}
const resPonseError = (msg) => {
  return {
    code: 1,
    message: 'sever is error',
    msg,
    data: []
  }
}
function Promise1({code}, msg) {
  return new Promise((resolve, reject) => {
      if (code === 0) {
        resolve(resPonseSuccess(msg))
      } else {
        reject(resPonseError(msg));
      }
  })
}
function Promise2({code}, msg) {
  return new Promise((resolve, reject) => {
      if (code === 0) {
        resolve(resPonseSuccess(msg))
      } else {
        reject(resPonseError(msg));
      }
  })
}
function Promise3({code}, msg) {
  return new Promise((resolve, reject) => {
      if (code === 0) {
        resolve(resPonseSuccess(msg))
      } else {
        reject(resPonseError(msg));
      }
  })
}

const handleRequestALL = () => {
  return Promise.all([Promise1({code: 0}, '我是第一个promise'), Promise2({code: 0}, '我是第二个promise'), Promise3({code: 0}, '我是第三个promise')])
}

// handleRequestALL().then((res) => {
//   console.log(res);
// }).catch((err) => {
//     console.log(err)
// })

// const handleRequestAllSelected = () => {
//     const arr = [Promise.resolve({code: 1}), Promise.resolve({code: 0}), Promise.resolve({code: 0})];
//     Promise.allSettled(arr).then((res) => {
//       console.log(res)
//    })
// }
// handleRequestAllSelected();

const handleRequestRace = () => {
  return Promise.race([Promise1({code: 0}, '我是第一个promise'), Promise2({code: 1}, '我是第二个promise'), Promise3({code: 1}, '我是第三个promise')])
}
handleRequestRace().then((res) => {
    console.log(res);
});