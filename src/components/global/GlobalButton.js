"use client";

const GlobalButton=({children,type='button',name='button',className, data, eventName, onClick, ...props})=>{
  const handleClick=(e)=>{
    if(data && eventName){
      window.dataLayer = window.dataLayer || [];      
      const eventData = {'event': eventName, ...data}
      dataLayer.push(eventData);
    }
    if(onClick){onClick(e)}
  };
  return (<button className={className} type={type} aria-label={name} onClick={handleClick} {...props}>{children}</button>);
};
export default GlobalButton;
