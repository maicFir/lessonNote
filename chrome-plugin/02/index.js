document.getElementById("send").addEventListener(
    "click",
    () => {
        console.log("点击了");
        window.postMessage({ type: "FROM_PAGE", text: "green" }, "*");
    },
    false
);
