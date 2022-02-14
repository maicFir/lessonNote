// 条件类型

interface Animal {
    live(): void
}

interface Dog extends Animal{ 
    woof(): void
}

type isDog = Dog extends Animal ? true : false;

// type MessageOf<T> = T['message']; // 类型“"message"”无法用于索引类型“T”

type MessageOf<T extends { message: unknown }> = T['message'];

const message: MessageOf<{ message: string }> = '成功'; // const message: string

type MessageOf2<T> = T extends { message: unknown } ? T['message'] : never;

interface Email {
    message: string
}
interface Dog {
    break(): void
}
type EmailContent = MessageOf2<Email>;

type DogContent = MessageOf2<Dog>;

type Flatten<T> = T extends T[] ? T[number] : T;

type Str = Flatten<number[]>;
const strResult: Str = [1, 2];
