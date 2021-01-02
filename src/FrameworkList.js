import React from "react";

const FrameworkList = (props) => {
    // 配列の要素がそもそもない場合、もしくは配列の要素の長さが0の場合
  if (!props.frameworks || !props.frameworks.length) {
    return <h1>No data !</h1>;
  }
  return (
    <div>
      <ul>
        {props.frameworks.map(({ id, item }) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FrameworkList;
