import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";
import React, { useState } from "react";


const btnValues = [
  ['M+', "M-", "MR", "MC",],
  ['HIS', '^', '+-','%'],
  ["C", "CE", "√", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  
  const [currentNum, setCurrentNum] = useState('')
  const [dispResult, setDispResult] = useState('')

  const [calcMem, setCalcMem] = useState('')
  const [history, setHistory] = useState([])
  const [historyModal, setHistoryModal]  = useState(false)

  const [logInStatus, setLogInStatus] = useState(false)

  // this is going to be user to store some users and allow for new users
  let dataBase = [ ]


  const memoryHandler = (e) => {
    e.preventDefault();
   
    if (e.target.innerHTML === "M+") { 
      setCalcMem(Number(calcMem) + Number (currentNum))
    }
    if (e.target.innerHTML === "M-") { 
      setCalcMem(Number(calcMem) - Number (currentNum))
    }
    if (e.target.innerHTML === "MC") { 
      setCalcMem(0)
    }
    if (e.target.innerHTML === "MR") { 
      setDispResult(dispResult+String(calcMem))
    }
  }

  const historyHandler = () => {
    // need to show this on the page somewhere maybe a pop up module or something
    setHistoryModal(true)
  }

  const equalsClickHandler = () => {
    // tmp varible used to convert input so eval can read
    let tmpResult = String(dispResult)

    // anytime user hits enter it's saved to history should i make all or just 1 instance? 
    // setHistory(history + ' , ' + tmpResult )
    if (tmpResult.includes('x')){
      tmpResult = tmpResult.replace('x', '*')
    }
    if (tmpResult.includes('^')){
      tmpResult = tmpResult.replace('^', '**')
    }
    if (tmpResult !=='Error'){
      try {
        let ans = eval(tmpResult)
        setDispResult(ans)
        setCurrentNum(ans)
        setHistory([...history, tmpResult + ' = ' + ans])
      } catch (error) {
        setDispResult("Error")
      }
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
    if(!isNaN(value) || value ==='.'){
      setCurrentNum(currentNum+value)
    }
    if(value === '+' || value === '-' || value === '/' || value === 'x'){
      setCurrentNum('')
    }
   
  }

  
  return (
    <>
      <NavBar logInStatus={logInStatus} setLogInStatus={setLogInStatus}></NavBar>
      <Modal open={historyModal} onClose={() => setHistoryModal(false)} historyArr ={history}/> 
      <Wrapper>
      <Screen value={dispResult ? dispResult : 0} />
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
                      : btn === 'MR' || btn === 'MC' || btn === 'M+' || btn === 'M-' 
                      ? memoryHandler
                      : btn === "HIS"
                      ? historyHandler
                      : dispResultAppend 
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