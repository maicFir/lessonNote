window.onload = function () {
    // 所有的html加载完毕，以及图片等资源加载完毕后才触发
    const app = document.getElementById("app");
    app.innerText = "hello";
    console.log("html...loader");
};
console.log("defer");