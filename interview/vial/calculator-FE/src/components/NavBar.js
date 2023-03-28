import { useState } from "react";
import "./NavBar.css"; 

const NavBar = ({logInStatus, setLogInStatus, userValidation, currentUser, setCurrentUser,createNewUser})=>{

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
    userValidation(uname.value,pass.value)
  };

  const handleSubmitSignUp = (e) =>{
    e.preventDefault();
    let { uname, pass } =  document.forms[0]
    
    if (uname.value.length>0 && pass.value.length>0){
      createNewUser(uname.value,pass.value)
    }
    else{
      alert('Please fill in both User Name and Password')
    }
    
  }

  const logOut = ()=>{
    setCurrentUser('')
    setLogInStatus(false)
}
 

return (
  <>
    
    
    <div className="header">

      
      {logInStatus ? 
      <>
        <div>
          Welcome {currentUser}
        </div>
        <button className = 'subButton' onClick={logOut} >Log Out</button>
      </>
      :
      navState === 1 ? 
      <div>
        <form onSubmit={handleSubmit} className='subForm'>
          <div className="subText"> Sign In</div>
          <input type ='text' name='uname' placeholder="User Name"></input>
          <input type='password' name ='pass' placeholder="Pass Word" required></input>
          <input className = 'subButton' type='submit'/>
          <button className = 'subButton' onClick={resetNavState}>Cancel</button>
        </form>
      </div>
      
      :
      ""}
      
      {navState === 2 ? 
        <div>
        <form onSubmit={handleSubmitSignUp} className='subForm'>
          <div className="subText">Sign Up</div>
          <input type ='text' name='uname' placeholder="User Name"></input>
          <input type='password' name ='pass' placeholder="Pass Word " ></input>
          <input  className = 'subButton' type='submit'/>
          <button  className = 'subButton' onClick={resetNavState}>Cancel</button>
        </form>
      </div>
      :
      ""}

      {navState === 0 ? 
      
        <div className="signButtons">
          <button className="buttons" onClick={signIn}>Sign In</button>
          <button className="buttons" onClick={signUp}>Sign Up</button>
        </div>
      :
      ""}
      
    </div>
   
  </>
)
}

export default NavBar