import React, {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
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
        {id: 26, checked: false, type: 5, name: "omr", ref: useRef(null)},
    ])

    const [currentRef, setCurrentRef] = useState<any>(null)

    const inputSignals = signals.filter(s => s.type === 4)
    const absDeviationSignals = signals.filter(s => s.type === 1)
    const contributionSignals = signals.filter(s => s.type === 3)

    const mappedSignals: any = []

    inputSignals.forEach(inputSignal => {
        const predictSignal = signals.find(s => s.type === 0 && s.name.includes(inputSignal.name))
        const absSignal = signals.find(s => s.type === 1 && s.name.includes(inputSignal.name))
        const relSignal = signals.find(s => s.type === 2 && s.name.includes(inputSignal.name))
        const contrSignal = signals.find(s => s.type === 3 && s.name.includes(inputSignal.name))
        mappedSignals.push({inputSignal, predictSignal, type: 4})
        mappedSignals.push({absSignal, relSignal, type: 1})
        mappedSignals.push({contrSignal, type: 3})
    })
    console.log(mappedSignals)
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
                {mappedSignals.map((mSignals: any) => mSignals.type === 4 ? <div key={mSignals.inputSignal.id}>
                    <input type="checkbox" checked={mSignals.inputSignal.checked} name="isGoing"
                           onChange={() => setSignals(signals.map((s: any) => s.id === mSignals.inputSignal.id ? {
                               ...s,
                               checked: !s.checked
                           } : s))}/>
                </div> : "")}
            </div>
            <TransitionGroup className="signals">
                {mappedSignals.map((el: any) => el.type === 4 && el.inputSignal.checked ? <CSSTransition
                            key={el.inputSignal.id}
                            nodeRef={el.inputSignal?.ref}
                            timeout={500}
                            classNames="input-signal"
                            onEntered={() => setCurrentRef(el.inputSignal?.ref)}
                        >
                            <div ref={ref}>
                                <div className={"grey-box"} ref={el.inputSignal?.ref}>
                                    {el.inputSignal.name}
                                    <div className={"buttons"}>
                                        <button className={"show-blue-box-btn"}
                                                onClick={() => setSignals(signals.map((s: any) => s.type === 1 && s.name.includes(el.inputSignal.name) ? {
                                                    ...s,
                                                    checked: !s.checked
                                                } : s))}>1,2
                                        </button>
                                        <button className={"show-green-box-btn"}
                                                onClick={() => setSignals(signals.map((s: any) => s.type === 3 && s.name.includes(el.inputSignal.name) ? {
                                                    ...s,
                                                    checked: !s.checked
                                                } : s))}>3
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                        : el.type === 1 && el.absSignal.checked ? <CSSTransition
                                key={el.absSignal.id}
                                nodeRef={el.absSignal?.ref}
                                timeout={500}
                                classNames="input-signal"
                                onEntered={() => setCurrentRef(el.absSignal?.ref)}
                            >
                                <div ref={ref}>
                                    <div className={"blue-box"} ref={el.absSignal?.ref}>
                                        <span>{el.absSignal.name}</span>
                                    </div>

                                </div>
                            </CSSTransition>
                            : el.type === 3 && el.contrSignal.checked ? <CSSTransition
                                key={el.contrSignal.id}
                                nodeRef={el.contrSignal?.ref}
                                timeout={500}
                                classNames="input-signal"
                                onEntered={() => setCurrentRef(el.contrSignal?.ref)}
                            >
                                <div ref={ref}>
                                    <div className={"green-box"} ref={el.contrSignal?.ref}>
                                        <span>{el.contrSignal.name}</span>
                                    </div>
                                </div>
                            </CSSTransition> : ""
                )}
            </TransitionGroup>
            <div>

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

    //position: relative;

    .buttons {
      //position: absolute;
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
    height: 225px;
    width: 500px;
    background-color: #bebeff;
  }

  .green-box {
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
