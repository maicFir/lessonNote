function test(target: any) {
  console.log(target);
  console.log(new target().name);
}
function getName(target: any, key: string, descriptor: any) {
  //console.log(target, key, descriptor);
  const fn = descriptor.value;
  const result = fn();
  console.log(result);
}
function Get(url: string) {
  return (target: any, key: string, descriptor: any) => {
    console.log(target, key, descriptor);
    const request = fetch(url);
    const fn = descriptor.value;
    request
      .then((res) => res.json())
      .then((result) => {
        fn.call(target, result);
      });
  };
}

function userParams(target: any, key: string, parameterIndex: number) {
  console.log(target, key, "===");
}

function getAge(target: any, key: string) {
  console.log(target, "==getAge");
  console.log(key, "=key");
}

@test
class Person {
  @getAge
  public age: number;
  constructor(public name: string, public useInfo: any) {
    this.name = "Web技术学苑";
    this.useInfo = {
      age: 18,
      sex: "男",
    };
    this.age = 18;
  }
  @getName
  getName() {
    return "Maic";
  }
  @Get("https://movie.douban.com/j/search_tags?type=movie&source=index")
  getUserInfo(res: any) {
    console.log(res);
  }

  setUseInfo(@userParams params: any = { age: "10" }) {
    return this.name;
  }
}
