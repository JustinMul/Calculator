import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import NavBar from "./components/NavBar";
import React, { useState } from "react";

const btnValues = [
  ['M+', "M-", "MR", "MC",],
  ['HIS ', '^', '+-','%'],
  ["C", "CE", "√", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const App = () => {
 
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  
  let [dispResult, setDispResult] = useState('')

  console.log('this is calc,', calc)
  // state to manage calc memory functions
  let [calcMem, setCalcMem] = useState('')


  const memoryHandler = (e) => {
    e.preventDefault();
   
    if (e.target.innerHTML === "M+") { 
      setCalcMem(calc.num/1 !== 0 ? calcMem+=calc.num/1  : calcMem+=calc.res/1 )
    }
    if (e.target.innerHTML === "M-") { 
      setCalcMem(calc.num/1 !== 0 ? calcMem-=calc.num/1  : calcMem-=calc.res/1 )
    }
    if (e.target.innerHTML === "MC") { 
      setCalcMem(0)
    }
    if (e.target.innerHTML === "MR") { 
     setCalc({ sign: calc.sign,
     num: calcMem/1,
     res: calcMem/1,})

    }

    
  }
  
  // used when a number is typed in calc 
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  // used when decimal is clicked
  const decimalClickHandler = (e) => {
    console.log('this is decimal')
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  
  // used when a sign is clicked
  const signClickHandler = (e) => {
    // need to add the order of operations logic here 3

    const symbolPriority = {
      '^':3,
      '√':3,
      '/':2,
      'X':2,
      '+':1,
      '-':1
    }

    e.preventDefault();
    const value = e.target.innerHTML;
    if (e.target.innerHTML === '√') {
      console.log('enter?')
      setCalc({...calc, res: calc.num ? Math.sqrt(calc.num) : Math.sqrt(calc.res),
      sign: "",
      num: 0,})
    }
    else{
      setCalc({
        ...calc,
        sign: value,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0,
      });
    }
   
    
  };

  const equalsClickHandler = () => {
    // tmp varible used to conver input so eval can read
    let tmpResult = dispResult
   
    if (tmpResult.includes('x')){
      tmpResult = tmpResult.replace('x', '*')
    }
    if (tmpResult.includes('^')){
      tmpResult = tmpResult.replace('^', '**')
    }
    // if (tmpResult.includes('√')){
    //   tmpResult = tmpResult.replace('√', '**')
    // }


    
    let ans = eval(tmpResult)
    setDispResult(ans)
    // console.log('this is equal')
    // if (calc.sign && calc.num) {
    //   console.log('do we enter? ')
    //   const math = (a, b, sign) =>
        
    //     sign === "+"
    //       ? a + b
    //       : sign === "-"
    //       ? a - b
    //       : sign === "X"
    //       ? a * b
    //       : sign === '/'
    //       ? a / b
    //       : sign === '√'
    //       ? Math.sqrt(a)
    //       : a**b
      
    //   setCalc({
    //     ...calc,
    //     res:
    //       calc.num === "0" && calc.sign === "/"
    //         ? "Can't divide with 0"
    //         : math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign),
    //     sign: "",
    //     num: 0,
    //   });
    // }
  };
  

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;
  
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    // setCalc({
    //   ...calc,
    //   sign: "",
    //   num: 0,
    //   res: 0,
    // });

    setDispResult('')
  };

  const deleteClickHandler  = () => {
    setDispResult(dispResult.slice(0, -1))
  }
 
  const dispResultAppend = (e) => {
    setDispResult(dispResult+e.target.innerHTML)
  }


  
  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
      <Screen value={dispResult ? dispResult : 0} />
        {/* <Screen value={calc.num ? calc.num : calc.res} /> */}
        <ButtonBox>
        {
            btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={
                  
                      btn === "C"
                      ? resetClickHandler
                      : btn === "+-"
                      ? invertClickHandler
                      : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                      ? equalsClickHandler
                      : btn ==='CE'
                      ? deleteClickHandler 
                      : dispResultAppend 

                      // : btn === "/" || btn === "X" || btn === "-" || btn === "+" || btn === '^' || btn ===  '√'
                      // ? signClickHandler
                      // : btn === "."
                      // ? decimalClickHandler
                      // : btn === 'M+' || btn === "M-" || btn === "MC" || btn === "MR"
                      // ? memoryHandler
                      
                      // : numClickHandler

                      

                    
                  }
                />
              );
            })
          }
        </ButtonBox>
      </Wrapper>

    </>
  );
};

export default App;