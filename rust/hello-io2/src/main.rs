use std::io;

fn main() {
    println!("please input name");
    let _name = "world";
    let mut name = String::new(); // 申明一个可变

    // io调用stdin()方法，然后使用read_line
    io::stdin()
        .read_line(&mut name) // 可变形参
        .expect("failed to read line"); // 异常判断
    println!("Hello {}!", name.trim());
}
