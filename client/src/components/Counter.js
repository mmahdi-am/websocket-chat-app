import React from 'react'
function Counter({second,onComplete}) {
    const [counter, setCounter] = React.useState(second);
    React.useEffect(() => {
      counter > 0 && setTimeout(() =>{
        setCounter((prev) => prev - 1)
      } , 1000);
    if(counter === 0){
        onComplete()
    }
    }, [counter,onComplete]);
   return (   
        <span style={{marginLeft:"1px",marginRight:"1px",display:"inline-block",color:"red"}}>{counter}</span>     
    );
  }


  export default Counter