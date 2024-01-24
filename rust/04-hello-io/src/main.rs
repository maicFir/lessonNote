use std::io;

fn main() {
    let mut name = String::new();
    println!("Please enter your name: ");
    // 读取name
    io::stdin()
        .read_line(&mut name)
        .expect("Failed to read line");

    println!("Hello {}!", name); // 输出
}
