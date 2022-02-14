var msg = "hello";
console.log(msg.toLocaleLowerCase());
function curentYear(year, date) {
    return "\u4ECA\u5E74".concat(year, ", ").concat(date.toLocaleDateString());
}
curentYear('100', new Date());
function prirntName(name, age) {
    console.log("name:" + name);
    console.log("age:" + age);
}
prirntName('maic');
