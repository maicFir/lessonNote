// typeof

let s = 'hello';
type sType = typeof s;
let stype: typeof s;

// ReturnType 返回类型
type Predicate = (x: number) => boolean;

type K = ReturnType<Predicate>;

function f() {
    return {
        x: 10,
        y: 3
    }
}
type fresult = typeof f;
// type P = ReturnType<fresult>
type P = ReturnType<typeof f>

function identify<Type>(arg: Type): Type {
    return arg;
}
type P2 = typeof identify // type P2 = <Type>(arg: Type) => Type

const enum USER_STATUS {
    success = 1,
    error = 0
}
console.log(USER_STATUS.error);
type userResult = typeof USER_STATUS;
type userResult2 = keyof typeof USER_STATUS;

const user: userResult = {
    success: USER_STATUS.success,
    error: USER_STATUS.error
}
const user2: userResult2 = 'success';
