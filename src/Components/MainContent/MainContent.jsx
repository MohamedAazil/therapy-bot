import React, { useContext } from "react";
import assets from "../../assets/assets";
import { Context } from "../../Context/Context";
import "./MainContent.css";
const MainContent = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>FitBot</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Mohamed</span>
              </p>
              <p>How can I help you?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest tourist spots near me</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Breiwfly summarize this concept</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Ask me anything..."
            />
            <div className="">
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" onClick={() => onSent()} />
            </div>
          </div>
          <p className="bottom-info">
            FitBot may display inaccurate info. User's are required to verify
            facts and actions on their own
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
