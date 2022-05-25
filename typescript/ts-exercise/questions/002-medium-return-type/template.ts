type MyReturnType<T> = T extends (...arg: any[]) => infer R ? R : never;

type USER_INFO = {
  name: string;
  age: number;
};
function getUser(): USER_INFO {
  return {
    name: 'Maic',
    age: 18
  };
}
type infoRes = typeof getUser;
const userInfo: ReturnType<infoRes> = { name: '', age: 10 };
const userInfo2: MyReturnType<typeof getUser> = { name: 'maic', age: 18 };

const userInfo3: MyReturnType<() => string> = ''; // const userInfo3:string
const userInfo4: MyReturnType<<T extends number[]>() => T> = [1, 2];
/**
 * MyReturnType 返回一个函数的返回类型
 */
