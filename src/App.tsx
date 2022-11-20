import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import styled from "styled-components";
import {useInView} from "react-intersection-observer";
import {
    CSSTransition,
    TransitionGroup,
} from "react-transition-group";

function App() {
    const [signals, setSignals] = useState([
        {id: 1, checked: false, type: 4, name: "inputS1", ref: useRef(null)},
        {id: 2, checked: false, type: 4, name: "inputS2", ref: useRef(null)},
        {id: 3, checked: false, type: 4, name: "inputS3", ref: useRef(null)},
        {id: 4, checked: false, type: 4, name: "inputS4", ref: useRef(null)},
        {id: 5, checked: false, type: 4, name: "inputS5", ref: useRef(null)},
        {id: 6, checked: false, type: 1, name: "inputS1_abs", ref: useRef(null)},
        {id: 7, checked: false, type: 1, name: "inputS2_abs", ref: useRef(null)},
        {id: 8, checked: false, type: 1, name: "inputS3_abs", ref: useRef(null)},
        {id: 9, checked: false, type: 1, name: "inputS4_abs", ref: useRef(null)},
        {id: 10, checked: false, type: 1, name: "inputS5_abs", ref: useRef(null)},
        {id: 11, checked: false, type: 2, name: "inputS1_rel", ref: useRef(null)},
        {id: 12, checked: false, type: 2, name: "inputS2_rel", ref: useRef(null)},
        {id: 13, checked: false, type: 2, name: "inputS3_rel", ref: useRef(null)},
        {id: 14, checked: false, type: 2, name: "inputS4_rel", ref: useRef(null)},
        {id: 15, checked: false, type: 2, name: "inputS5_rel", ref: useRef(null)},
        {id: 16, checked: false, type: 3, name: "inputS1_contr", ref: useRef(null)},
        {id: 17, checked: false, type: 3, name: "inputS2_contr", ref: useRef(null)},
        {id: 18, checked: false, type: 3, name: "inputS3_contr", ref: useRef(null)},
        {id: 19, checked: false, type: 3, name: "inputS4_contr", ref: useRef(null)},
        {id: 20, checked: false, type: 3, name: "inputS5_contr", ref: useRef(null)},
        {id: 21, checked: false, type: 0, name: "inputS1_pred", ref: useRef(null)},
        {id: 22, checked: false, type: 0, name: "inputS2_pred", ref: useRef(null)},
        {id: 23, checked: false, type: 0, name: "inputS3_pred", ref: useRef(null)},
        {id: 24, checked: false, type: 0, name: "inputS4_pred", ref: useRef(null)},
        {id: 25, checked: false, type: 0, name: "inputS5_pred", ref: useRef(null)},
        {id: 26, checked: false, type: 5, name: "omr"},
    ])
    const [currentRef, setCurrentRef] = useState<any>(null)

    const inputSignals = signals.filter(s => s.type === 4)
    const absDeviationSignals = signals.filter(s => s.type === 1)
    const contributionSignals = signals.filter(s => s.type === 3)

    const {ref, inView, entry} = useInView({
        /* Optional options */
        threshold: 1,
    });


    useEffect(() => {
        !inView && currentRef?.current?.scrollIntoView({block: "end", behavior: "smooth"})
    }, [currentRef])

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
                {inputSignals.map(inS => <React.Fragment key={inS.id}>
                    <CSSTransition
                        in={inS.checked}
                        nodeRef={inS.ref}
                        timeout={500}
                        classNames="input-signal"
                        onEntered={() => setCurrentRef(inS.ref)}
                        unmountOnExit
                    >
                        <div ref={ref}>
                            <div className={"grey-box"} ref={inS.ref}>
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
                        </div>
                    </CSSTransition>

                    {
                        absDeviationSignals.map(absS => <React.Fragment key={inS.id}>
                                <CSSTransition
                                    in={absS.name.includes(inS.name) && absS.checked}
                                    nodeRef={absS.ref}
                                    timeout={500}
                                    classNames="input-signal"
                                    onEntered={() => setCurrentRef(absS.ref)}
                                    unmountOnExit
                                >
                                    <div ref={ref}>
                                        <div className={"blue-box"} ref={absS.ref}>
                                            {absS.name}
                                        </div>
                                    </div>
                                </CSSTransition>
                            </React.Fragment>
                        )
                    }
                    {
                        contributionSignals.map(contrS => <React.Fragment key={inS.id}>
                                <CSSTransition
                                    in={contrS.name.includes(inS.name) && contrS.checked}
                                    nodeRef={contrS.ref}
                                    timeout={500}
                                    classNames="input-signal"
                                    onEntered={() => setCurrentRef(contrS.ref)}
                                    unmountOnExit
                                >
                                    <div ref={ref}>
                                        <div className={"green-box"} ref={contrS.ref}>
                                            {contrS.name}
                                        </div>
                                    </div>
                                </CSSTransition>
                            </React.Fragment>
                        )
                    }
                </React.Fragment>)}
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


  //анимация для линейных графиков
  .input-signal-enter {
    //overflow: hidden;
    opacity: 0;
    height: 0;
  }

  .input-signal-enter-active {
    //overflow: hidden;
    opacity: 1;
    height: 225px;
    transition: 500ms;
  }

  .input-signal-exit {
    overflow: hidden;
    opacity: 1;
    height: 225px;
  }

  .input-signal-exit-active {
    //overflow: hidden;
    opacity: 0;
    height: 0;
    transition: 500ms;
  }

`

export default App;
