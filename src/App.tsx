import React, {useEffect, useState} from "react";
import "./App.css";
import styled from "styled-components";
import {useInView} from "react-intersection-observer";

function App() {
    const [signals, setSignals] = useState([
        {id: 1, checked: false, type: 4, name: "inputS1"},
        {id: 2, checked: false, type: 4, name: "inputS2"},
        {id: 3, checked: false, type: 4, name: "inputS3"},
        {id: 4, checked: false, type: 4, name: "inputS4"},
        {id: 5, checked: false, type: 4, name: "inputS5"},
        {id: 6, checked: false, type: 1, name: "inputS1_abs"},
        {id: 7, checked: false, type: 1, name: "inputS2_abs"},
        {id: 8, checked: false, type: 1, name: "inputS3_abs"},
        {id: 9, checked: false, type: 1, name: "inputS4_abs"},
        {id: 10, checked: false, type: 1, name: "inputS5_abs"},
        {id: 11, checked: false, type: 2, name: "inputS1_rel"},
        {id: 12, checked: false, type: 2, name: "inputS2_rel"},
        {id: 13, checked: false, type: 2, name: "inputS3_rel"},
        {id: 14, checked: false, type: 2, name: "inputS4_rel"},
        {id: 15, checked: false, type: 2, name: "inputS5_rel"},
        {id: 16, checked: false, type: 3, name: "inputS1_contr"},
        {id: 17, checked: false, type: 3, name: "inputS2_contr"},
        {id: 18, checked: false, type: 3, name: "inputS3_contr"},
        {id: 19, checked: false, type: 3, name: "inputS4_contr"},
        {id: 20, checked: false, type: 3, name: "inputS5_contr"},
        {id: 21, checked: false, type: 0, name: "inputS1_pred"},
        {id: 22, checked: false, type: 0, name: "inputS2_pred"},
        {id: 23, checked: false, type: 0, name: "inputS3_pred"},
        {id: 24, checked: false, type: 0, name: "inputS4_pred"},
        {id: 25, checked: false, type: 0, name: "inputS5_pred"},
        {id: 26, checked: false, type: 5, name: "omr"},
    ])

    const inputSignals = signals.filter(s => s.type === 4)
    const absDeviationSignals = signals.filter(s => s.type === 1)
    const contributionSignals = signals.filter(s => s.type === 3)

    const {ref, inView, entry} = useInView({
        /* Optional options */
        threshold: 0,
    });


    return (
        <AppStyled>
            <div>
                {inputSignals.map(inS => <div key={inS.id}>
                    <input type="checkbox" checked={inS.checked} name="isGoing"
                           onChange={() => setSignals(signals.map(s => s.id === inS.id ? {
                               ...s,
                               checked: !s.checked
                           } : s))}/>
                </div>)}
            </div>
            <div>
                {inputSignals.map(inS => inS.checked ? <div key={inS.id}>
                    <div className={"grey-box"}>
                        {inS.name}
                        <div className={"buttons"}>
                            <button className={"show-blue-box-btn"}
                                    onClick={() => setSignals(signals.map(s => s.type === 1 && s.name.includes(inS.name) ? {
                                        ...s,
                                        checked: !s.checked
                                    } : s))}>1,2
                            </button>
                            <button className={"show-green-box-btn"}
                                    onClick={() => setSignals(signals.map(s => s.type === 3 && s.name.includes(inS.name) ? {
                                        ...s,
                                        checked: !s.checked
                                    } : s))}>3
                            </button>
                        </div>
                    </div>
                    {
                        absDeviationSignals.map(absS => {
                                return (
                                    absS.name.includes(inS.name) && absS.checked ?
                                        <div className={"blue-box"}>{absS.name}</div> : ""
                                )
                            }
                        )
                    }
                    {
                        contributionSignals.map(absS => {
                                return (
                                    absS.name.includes(inS.name) && absS.checked ?
                                        <div className={"green-box"}>{absS.name}</div> : ""
                                )
                            }
                        )
                    }
                </div> : "")}
            </div>
        </AppStyled>
    );
}

const AppStyled = styled.div`
  display: flex;

  .grey-box {
    margin: 5px auto 0;
    height: 225px;
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
