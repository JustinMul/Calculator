import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const btnValues = [
  ['M+', "M-", "MR", "MC",],
  ["C", "√", "%", "/"],
  ['HIS ', '^', '+-',''],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];


const App = () => {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  
  return (
    <Wrapper>
      <Screen value="0" />
      <ButtonBox>
      {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={() => {
                
                  console.log(`${btn} clicked!`);
                }}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;