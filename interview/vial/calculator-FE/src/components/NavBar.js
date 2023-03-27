import { useState } from "react";
import "./NavBar.css"; 

const NavBar = ({logInStatus, setLogInStatus})=>{

  const [navState, setNavState] = useState(0)

  const resetNavState = () => {
    setNavState(0)
  }

  const signIn = ()=> {
    setNavState(1)
  }

  const signUp =()=>{
    setNavState(2)
  }

  const handleSubmit = (e) => {
   
    e.preventDefault();
    let { uname, pass } =  document.forms[0]
    console.log('this is uname', uname.value, pass.value)
  };

return (
  <>
    
    <div className="header">

      {navState === 1 ? 
      <div>
        <form onSubmit={handleSubmit}>
          <div>Sign In</div>
          <input type ='text' name='uname' placeholder="User Name"></input>
          <input type='password' name ='pass' placeholder="Pass Word" required></input>
          <input type='submit'/>
          <button onClick={resetNavState}>Cancel</button>
        </form>
      </div>
      
      :
      ""}
      
      {navState === 2 ? 
        <div>
        <form onSubmit={handleSubmit}>
          <div>Sign Up</div>
          <input placeholder="User Name"></input>
          <input type='password' placeholder="Pass Word " ></input>
          <input type='submit'/>
          <button onClick={resetNavState}>Cancel</button>
        </form>
      </div>
      :
      ""}

      {navState === 0 ? 
      <div>
         {logInStatus ? 
        <div>
          Welcome Name
        </div>
        :
        <div className="signButtons">
          <button className="buttons" onClick={signIn}>Sign In</button>
          <button className="buttons" onClick={signUp}>Sign Up</button>
        </div>
      }

      </div>:
      ""}
     
      
      
    </div>
   
  </>
)
}

export default NavBar