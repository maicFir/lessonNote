use ferris_says::say;
use std::io::{stdout, BufWriter};
fn main() {
    let stdout: std::io::Stdout = stdout();
    let message = String::from("hello maic");
    let width: usize = message.chars().count();
    let mut writer = BufWriter::new(stdout.lock());
    say(message.as_bytes(), width, &mut writer).unwrap();
    println!("Hello, world!");
}
