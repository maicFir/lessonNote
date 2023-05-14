/**
 * @description Header
 * @author maicFir
 */
import React, { PropsWithChildren, useRef, useState, useEffect } from "react";
import { userTitle } from "../../hooks";
import type { UserInfo, Menu } from "./userInterfence";
// interface Props {
//   children?: React.ReactNode;
//   className?: string;
// }
interface Props {
  children: React.ReactNode;
  className: string;
}
interface ChildProps {}
const SubHeader: React.FC = (
  props: PropsWithChildren<{}> & Partial<ChildProps>
) => {
  return <div className={`sub-header`}>{props.children}</div>;
};
type InputProps = {
  onSure: () => void;
};
const Input: React.FC<InputProps> = (props) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Web技术学苑",
    age: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const sureRef = useRef<HTMLDivElement>(null);
  const body = document!.getElementsByTagName("body")[0];
  body.addEventListener("click", () => {
    console.log(sureRef.current?.style);
    console.log("body");
  });
  return (
    <>
      <input type="text" ref={inputRef} defaultValue={userInfo.name} />
      <input type="text" defaultValue={userInfo.age} />
      <div ref={sureRef} onClick={props?.onSure}>
        确定
      </div>
    </>
  );
};
const MenuComp: React.FC<Omit<Menu, "items" | "isChecked">> = (props) => {
  return (
    <>
      <p>{props.price}</p>
      <p>{props.title}</p>
    </>
  );
};
const MenuSubComp: React.FC<Pick<Menu, "items">> = (props) => {
  return (
    <>
      <p>{props.items[0].name}</p>
      <p>{props.items[0].price}</p>
    </>
  );
};

const Index: React.FC<Partial<Props>> = (props) => {
  const { title } = userTitle();
  const { className } = props;
  const handleSure = () => {};
  const subInfo: Pick<Menu, "items"> = {
    items: [
      {
        name: "Maic",
        price: 10,
      },
    ],
  };
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <header className={`App-header ${className}`}>
      <SubHeader />
      <Input onSure={handleSure} />
      <MenuComp price={10} title={"menuA"} />
      <MenuSubComp items={subInfo.items} />
      {props.children}
    </header>
  );
};

export default Index;
