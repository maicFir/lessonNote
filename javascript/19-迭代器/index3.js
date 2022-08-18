
function* test() {
    try {
        yield 1;
    } catch (error) {
        console.log(error)
    }
    yield 2;
}
const gen = test();
// console.log(gen.next())
// gen.throw('错误了');
console.log(gen.next())

