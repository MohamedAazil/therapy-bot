import React, { useContext, useState } from 'react';
import assets from '../../assets/assets';
import { Context } from '../../Context/Context';
import './Sidebar.css';

const Sidebar = () => {

    const {onSent, prevPrompts,setRecentPrompt,newChat} = useContext(Context);
    const [extended,setExtended] = useState(true);

    const loadPrompt =  async (propmt) => {
        setRecentPrompt(propmt);
        await onSent(propmt);
    }

  return  (
    
    <div className='sidebar'>
        <div className="top">
            <img className={`${extended? "":"menu-extended"}`} src={assets.menu_icon} alt="" onClick={()=>setExtended(prev => !prev)} />
            <div className={`new-chat ${extended? 'extended-new-chat':''}`} onClick={() => newChat()}>
                <img src={assets.plus_icon} alt="" className="menu" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended?<div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index) =>{
                    return (
                        <div className="recent-entry" key={index} onClick={() => loadPrompt(item)}>
                        <img src={assets.message_icon} alt="" />
                        <p>{item.slice(0,10)} {item.length>10? "...":""}</p>
                    </div>
                    )
                })}
                
            </div>:
            <div className="small-recent-entry">
                {prevPrompts.map((item,index) =>{
                    return (
                        <img src={assets.message_icon} alt="" key={index}/>
                    )
                })}
            </div>
            }
        </div>
        
        <div className="bottom">
            <div className={`bottom-item recent-entry ${extended? "":"recent-entry-extended"}`}>
                <img src={assets.question_icon} alt="" />
                {extended? <p>Help</p>:null}
                
            </div>
            <div className={`bottom-item recent-entry ${extended? "":"recent-entry-extended"}`}>
                <img src={assets.history_icon} alt="" />
                {extended? <p>Activity</p> :null}
            </div>
            <div className={`bottom-item recent-entry ${extended? "":"recent-entry-extended"}`}>
                <img src={assets.setting_icon} alt="" />
                {extended? <p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar