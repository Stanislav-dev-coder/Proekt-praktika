import React, {useState} from 'react'


const Nights = () => {
    const [count,setCount] = useState(1)
    const [night,setNight] = useState('Ночь');

    const plus = () => {
        setCount(count + 1)
        if (count>3) {
            setNight('Ночей')
        }
        else setNight('Ночи')
    }
    const minus = () => {
        if (count>1) {
            setCount(count - 1)
        }
        if (count >= 1) {
            setNight('Ночь')
        }
        if (count<6 && count !=2 && count !=1)  {
            setNight('Ночи')
        }   
        if (count>5) {
            setNight('Ночей')
        }
}     

    return (
        <div style={{display:'flex',justifyContent:'left'}}>
        <button onClick={minus}>-</button>
        <input  type="text" value={count + ' ' + night}></input>
        <button  onClick={plus}>+</button>
    </div>);
}
export default Nights;   
