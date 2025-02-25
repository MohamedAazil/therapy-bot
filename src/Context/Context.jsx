import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();



export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index,nextWord) =>{
    setTimeout(()=>{
        setResultData(prev=>prev + nextWord)
        },75 * index)
    }

  const newChat = () =>{
    setLoading(false);
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    setRecentPrompt(prompt)
    if(prompt !== undefined){
        response = await runChat(prompt);
        setRecentPrompt(prompt);
    }
    else{
        setPrevPrompts(prev =>[...prev,input]);
        setRecentPrompt(input);
        response = await runChat(input);
    }
    
    setInput("");
    // setPrevPrompts(prev=>[...prev,input])
    // const response = await runChat(input);
    let responseArray = response.split("**")
    console.log(responseArray);
    let newResponse = "";
    for(let i = 0; i < responseArray.length; i++){
        if(i === 0 || i % 2 !== 1){
            console.log(responseArray[i]);
            newResponse += responseArray[i] +" ";
        }
        else{
            newResponse += "<b>" + responseArray[i] + "</b><br/>"
        }
    }
    let newResponse2 = newResponse.split("*").join("<br/>")
    let finalArray = newResponse2.split(" ");
    for(let i = 0; i < finalArray.length;i++){
        const nextWord = finalArray[i];
        delayPara(i,nextWord + " ");
    }

    setLoading(false);
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
