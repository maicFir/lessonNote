/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React from "react";
import { observer } from "mobx-react-lite";
import store from "@/store";
import { autorun } from "mobx";
interface Props {}

const Index: React.FC<Props> = observer(() => {
  const onChangeTheme = (theme: string) => {
    store.setTheme(theme);
  };
  autorun(() => {
    console.log(store.theme, "theme");
  });
  return (
    <div className="model-wrap">
      <p>模式：</p>
      <p className="dark dark:text-white" onClick={() => onChangeTheme("dark")}>
        夜间
      </p>
      <p
        className="light dark:text-[#fff]"
        onClick={() => onChangeTheme("light")}
      >
        日间
      </p>
    </div>
  );
});

export default Index;
