use rand::Rng;
use std::io;

fn main() {
    println!("猜数字游戏");
    println!("请输入一个1到100之间的数字");
    let secret_number = rand::thread_rng().gen_range(1..=100);
    loop {
        // 申明一个可变的变量，且为字符串类型输入值
        let mut input = String::new();

        io::stdin()
            .read_line(&mut input) // 这里引用的上面同一个input的值
            .expect("failed to read line"); // 防止系统报错
                                            // 将输入的字符串变为数字
        let input: u32 = input.trim().parse().expect("Please type a number!");

        // 比较输入值与随机数的带
        match input.cmp(&secret_number) {
            std::cmp::Ordering::Less => println!("太小了!"),
            std::cmp::Ordering::Greater => println!("太大了!"),
            std::cmp::Ordering::Equal => {
                println!("恭喜你，猜对了!");
                break;
            }
        }
    }
}
