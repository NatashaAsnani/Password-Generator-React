import {useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    // += means appending it 
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()-_+"

    // the length is coming from our state const [length, setLength] = useState(8)
    for(let i = 1; i < length; i++){
      // just generating a random number
      const char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)
    }

    // this will change the password into fresh one.
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    // highlights the password that shows it was copied to clipboard
    passwordRef.current?.select()
  }
  // TODO: UseCallBack: As long as things dont change too frequently, we actually use that
  //TODO: UseEffect you want to run the method intentionally as soon as something changes (USE EFFECT {OPPOSITE OF UseCallBack})
  // first is callback and other is dependency array(all the methods you want to give you should give in dependency array)
  useEffect(() => {generatePassword()}, [length, numberAllowed, charAllowed]) 
  //if number allowed changes; yes i want to run this, if char allowed changes; yes i want to run this, etc


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500'>
      <h1 className='my-3 text-center'>Password Generator</h1>
      {/* input box can be on the left a=side and button can be on the right side with these div properties.  */}
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value= {password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>

        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length}  className='cursor-pointer' onChange={(e) => setLength(e.target.value)}/>
          <label htmlFor="length">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}} name="" id="" />
          <label htmlFor="number">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>

          {/* taking previous value and reversing it: (prev) => !prev */}
          <input type="checkbox" defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}} name="" id="" />
          <label htmlFor="charInput">Characters</label>
        </div>


      </div>

    </div>
  )
}

export default App
