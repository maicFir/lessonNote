// 索引访问

type Person = {
    name: string;
    age: number
}
type Age = Person['age'] // type Age = number

type PersonKey = Person['age' | 'name'];

type PersonKey2 = Person[keyof Person];

type PersonKeys = 'name' | 'age';

const MyArray = [
    { name: 'tom', age: 10 },
    {
        name: 'bob',
        age: 22
    }
];
type personKey3 = typeof MyArray[number];
// type personKey3 = {
//     name: string;
//     age: number;
// }
type personKey4 = typeof MyArray[number]['age'];

const App = ['taoBao', 'Tmall', 'Alipay'] as const;

type app = typeof App[number];
function getPhoto(app: app) {
    console.log(app);
}
getPhoto('taoBao');
getPhoto('Tmall');
