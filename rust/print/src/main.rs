fn reverse(pair: (i32, bool)) -> (bool, i32) {
    // 可以使用 `let` 把一个元组的成员绑定到一些变量
    let (integer, boolean) = pair;
    // 不加分号，就是这个函数的这个元组就是该函数的返回值
    (boolean, integer)
}
#[derive(Debug)]
struct Matrix(f32, f32, f32, f32);

fn main() {
    // 输出后会换行
    println!("Hello, world!");
    // 不会换行
    // print!("hello i is print");

    // {},{}会一一占位hello world
    println!("{} {}", "hello", "world");

    // 0 hello 1 world
    println!("{0} {1} {0}", "a", "b");

    // 命名参数
    println!(
        "{name} likes to play {activity}",
        name = "John",
        activity = "Baseball"
    );
    // 输出的结果是:000001
    println!("{number:>0width$}", number = 1, width = 6);

    println!("1 + 2 = {}", 1 + 2);
    println!("1 - 2 = {}", 1i32 - 2);

    // 申明一个变量
    let num = 1_000;
    // 申明一个元组
    let pair = (3, true);
    let long_tuple = (
        1u8, 2u16, 3u32, 4u64, -1i8, -2i16, -3i32, -4i64, 0.1f32, 0.2f64, 'a', true,
    );
    println!("{}", num);
    println!("the reversed pair is {:?}", reverse(pair));
    // 解构元组
    let (a, b) = pair;
    println!("{}, {}", a, b);
    println!("{}, {}", pair.0, pair.1);
    println!("long tuple first value: {}", long_tuple.0);
    println!("long tuple second value: {}", long_tuple.1);
    println!("long tuple third value: {}", long_tuple.2);
    println!("long tuple fourth value: {}", long_tuple.3);
    println!("long tuple fifth value: {}", long_tuple.4);
    println!("long tuple sixth value: {}", long_tuple.5);
    println!("long tuple seventh value: {}", long_tuple.6);

    let matrix = Matrix(1.1, 1.2, 2.1, 2.2);
    println!("{:?}", matrix)
}
