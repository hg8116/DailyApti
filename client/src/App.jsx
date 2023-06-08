import './App.css'

function App() {

const printRandomNumber = () => {
  console.log(Math.random())
}

  return (
    <>
      <h1>React App</h1>
      <button onClick={printRandomNumber}>Print Random Number</button>
    </>
  )
}

export default App
