import { useState } from "react";
import Notices from "./Notices";

const Login = () => {

  const [textuser,setTextUser] = useState('')
  const [textpass,setTextPass] = useState('')
  const [login,setLogin] = useState(false)
  const [err,setErr] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('yes')
    // console.log(textuser)
    // console.log(textpass);
    fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/users`)
    .then((res)=>res.json())
    .then((data)=>{
      fetchAndRender(data)
    })
  }
  function fetchAndRender(data){
   data.forEach((ele)=>{
        if(ele.username===textuser && ele.password===textpass){
          setLogin(true)
          setErr(false)
        } else{
          setErr(true);
        }
      }
    );

    
    
  }
  console.log(login)

  return (
    <>
    {login ? <Notices/> :
      <div data-testid="loginForm">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={(e)=>setTextUser(e.target.value)}/>
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" onChange={(e)=>setTextPass(e.target.value)}/>
          </label>
          <br />
          <input type="submit" ></input>
        </form>
      </div>}
      {/* Show the below p tag only when someone tried to login with invalid credentials */}
      <p data-testid="invalidAlert">{err ? 'Invalid credentials' : ''}</p>
    </>
  );
};

export default Login;
