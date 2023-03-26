import { useState } from "react";
import "./NavBar.css"; 

const NavBar = ({logInStatus, setLogInStatus})=>{

  const [navState, setNavState] = useState(0)



  const signIn = ()=> {
    setNavState(1)
  }

  const signUp =()=>{
    setNavState(2)
  }

return (
  <>
    
    <div className="header">

      {navState === 1 ? 
      <div>
        <div>Sign In</div>
        <input placeholder="User Name"></input>
        <input type='password' placeholder="Pass Word " ></input>
        <button > Log In </button>
      </div>
      
      :
      ""}
      
      {navState === 2 ? 
        <div>
        <div>Sign Up</div>
        <input placeholder="User Name"></input>
        <input type='password' placeholder="Pass Word " ></input>
        <button> Sign Up </button>
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