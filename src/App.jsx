import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import cheerio from 'cherio/lib/cheerio'
import * as cheerio from 'cheerio';
import axios from 'axios';

function App() {
  const [a, setA] = useState(``)
  const [data, setData ] = useState(0)

  const getHTML = async (url) => {
    try {
      return await axios.get(url).then(
        (ob)=>{
          const con = cheerio.load(ob.data);
          const data = con('select[class=product-form--variant-select]').children().first()[0].attribs
          setData(data[`data-inventory-quantity`])
        }
      )
    } catch (error) {
      return new Error(`${error.name}: ${error.message} \n${error.stack}`);
    }
  };

  return (<>
    <input 
    type='text' 
    placeholder='재입고를 확인할 주소를 입력해주세요.'
    value={a}
    onChange={(e)=>{setA(e.target.value)}}
    />
    <button
    onClick={()=>{getHTML(a)}}
    >검색</button>
    <div>
      <b>{`남은 수량은 ${data}개 입니다.`}</b>
    </div>
  </>)
}

export default App
