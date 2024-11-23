/**
 * @description 设置页面
 * @author maicFir
 */
import React, { useState } from "react";
import styles from  "./index.module.scss";


const Index = (props) => {
  const {} = props;
  const [tagData, setTagData] = useState([
    {
      name: "tag1",
      value: "tag1",
    },
    {
      name: "tag2",
      value: "tag2",
    },
    {
      name: "tag3",
      value: "tag3",
    },
  ]);
  return (
    <div className={styles["tag-app"]}>
      <h1>tag</h1>
      <div className="tag-wrap">
        {tagData.map((v) => (
          <span className={v.name} key={v.name}>
            {v.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Index;
