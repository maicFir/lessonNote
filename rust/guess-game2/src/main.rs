use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    // 1 到100的随机数
    let secret_number = rand::thread_rng().gen_range(1..=100);
    let x = 5;
    let y = 10;

    println!("x={x} y={y}");
    println!("secret number {secret_number}");
    loop {
        println!("please input your luck number:");
        let mut number = String::new();
        io::stdin()
            .read_line(&mut number)
            .expect("failed to read line");

        println!("your luck number:{number}");
        // 将字符串转换为数字
        // let guess: u32 =  number.trim().parse().expect("Please type a number!");

        // 如果输入是数字，继续下面比较，如果不是数字，则提示输入数字
        let guess: u32 = match number.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Please type a number!");
                continue;
            }
        };
        // 比较输入的数字与随机数的大小
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),

            Ordering::Greater => println!("Too big!"),

            Ordering::Equal => {
                println!("You win!");
                break; // 中断，退出
            }
        }
    }
}
