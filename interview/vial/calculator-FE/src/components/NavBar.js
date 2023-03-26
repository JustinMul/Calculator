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
      
      
    </div>
   
  </>
)
}

export default NavBar