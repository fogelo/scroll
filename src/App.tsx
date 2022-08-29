import React, {useState} from "react";
import "./App.css";
import styled from "styled-components";

const signals = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
]


function App() {

    const [showBlueBox, setShowBlueBox] = useState<number[]>([])
    const [showGreenBox, setShowGreenBox] = useState<number[]>([])


    const renderBlueBox = (id: number) => {
        if (showBlueBox.includes(id)) {
            setShowBlueBox(showBlueBox.filter(item => item !== id))
        }
        if (!showBlueBox.includes(id)) {
            setShowBlueBox([...showBlueBox, id])
        }
    }

    const renderGreenBox = (id: number) => {
        if (showGreenBox.includes(id)) {
            setShowGreenBox(showGreenBox.filter(item => item !== id))
        }
        if (!showGreenBox.includes(id)) {
            setShowGreenBox([...showGreenBox, id])
        }
    }

    return (
        <AppStyled>
            {signals.map(s => <div>
                <div className={"grey-box"}>
                    <div className={"buttons"}>
                        <button className={"show-blue-box-btn"}
                                onClick={() =>renderBlueBox(s.id)}></button>
                        <button className={"show-green-box-btn"}
                                onClick={() => renderGreenBox(s.id)}></button>
                    </div>
                </div>
                {showBlueBox.includes(s.id) && <div className={"blue-box"}></div>}
                {showGreenBox.includes(s.id) && <div className={"green-box"}></div>}
            </div>)}
        </AppStyled>
    );
}

const AppStyled = styled.div`

  .grey-box {
    margin: 5px auto 0;
    height: 383px;
    width: 500px;
    background-color: #bababa;

    .buttons {
      display: flex;
      gap: 5px;
      padding: 5px;
      justify-content: end;

      .show-blue-box-btn {
        width: 50px;
        height: 50px;
        background-color: #bebeff;
        cursor: pointer;
      }

      .show-green-box-btn {
        width: 50px;
        height: 50px;
        background-color: #b2ffb2;
        cursor: pointer;
      }
    }
  }

  .blue-box {
    margin: 5px auto 0;
    height: 225px;
    width: 500px;
    background-color: #bebeff;
  }

  .green-box {
    margin: 5px auto 0;
    height: 225px;
    width: 500px;
    background-color: #b2ffb2;
  }

`

export default App;
