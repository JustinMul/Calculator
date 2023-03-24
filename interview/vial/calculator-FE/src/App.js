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

const App = () => {
 
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  
  let [currentNum, setCurrentNum] = useState('')
  let [dispResult, setDispResult] = useState('')


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


  const equalsClickHandler = () => {
    // tmp varible used to conver input so eval can read
    let tmpResult = dispResult
   
    if (tmpResult.includes('x')){
      tmpResult = tmpResult.replace('x', '*')
    }
    if (tmpResult.includes('^')){
      tmpResult = tmpResult.replace('^', '**')
    }


    try {
      setDispResult(eval(tmpResult))
      setCurrentNum(eval(tmpResult))
    } catch (error) {
      setDispResult("Error")
    }
    
  };
  



  const specialClickHandler = (e) => {
    let value = e.target.innerHTML
    
    let trimLen = currentNum.length
 
    let tmpCurr = String(dispResult).slice(0,-trimLen)
    if (value === '%'){
      setDispResult(tmpCurr+currentNum/100)
      setCurrentNum(String(currentNum)/100)
    }
    else if(value === '+-'){ 
      console.log('do we enter? ')
      setDispResult(tmpCurr+currentNum*-1)
      setCurrentNum(String(currentNum)*-1)
    }
    else {
      setDispResult(tmpCurr+Math.sqrt(currentNum))
      setCurrentNum(String(Math.sqrt(currentNum)))
    }
   

  };

  const resetClickHandler = () => {

    setDispResult('')
    setCurrentNum('')
  };

  const deleteClickHandler  = () => {
    setDispResult(String(dispResult).slice(0, -1))
    setCurrentNum(String(currentNum).slice(0, -1))
  }
 
  const dispResultAppend = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML
    setDispResult(dispResult+value)
    console.log('this is the outcome', isNaN(value))
    if(!isNaN(value) || value ==='.'){
      setCurrentNum(currentNum+value)
    }
    if(value === '+' || value === '-' || value === '/' || value === 'x'){
      setCurrentNum('')
    }
   



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
                      : btn === "%" || btn === '+-' || btn === '√'
                      ? specialClickHandler
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