import Login from "./Components/Login"
export default function App() { 
  return (
    <div className='App'>
      {/* Either login or Notices Components will be visible at a time */}  
      <Login/>    
    </div>
  )
}
