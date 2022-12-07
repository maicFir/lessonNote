
export const mockFeatchData = () => {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {

    // }, 1000)
    resolve([
      {
        name: `${Math.random()}, Web技术学苑`,
        id: Math.random() * 10
      }
    ])
  })
}
