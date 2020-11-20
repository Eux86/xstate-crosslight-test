import React, { useEffect } from 'react';
import './App.css';
import { interpret } from 'xstate';
import { useMachine } from '@xstate/react';
import { crosslightMachine, CrosslightStates } from './crosslightMachine';


export const App = () => {
  useEffect(() => {
    const crosslightService = interpret(crosslightMachine, { devTools: true });
    crosslightService.onTransition((state) => console.log(state));
    crosslightService.start();
  }, []);

  const [state, send] = useMachine(crosslightMachine);
  const isRed = state.matches(CrosslightStates.STOP);
  const isGreen = state.matches(CrosslightStates.GO);
  const isYellow = state.matches(CrosslightStates.WARNING);

  const warn = () => send('SWITCH_TO_WARN');
  const go = () => send('SWITCH_TO_GO');
  const stop = () => send('SWITCH_TO_STOP');

  const canGo = state.nextEvents.includes('SWITCH_TO_GO');
  const canWarn = state.nextEvents.includes('SWITCH_TO_WARN');
  const canStop = state.nextEvents.includes('SWITCH_TO_STOP');
  return (
    <>
      <h1>Crosslight</h1>
      <div id="crosslight">
        <div className={isGreen ? 'greenCircle' : 'offCircle'} />
        <div className={isYellow ? 'yellowCircle' : 'offCircle'} />
        <div className={isRed ? 'redCircle' : 'offCircle'} />
      </div>
      <h2>Available Events</h2>
      <button disabled={!canGo} onClick={go} type="button">GO</button>
      <button disabled={!canWarn} onClick={warn} type="button">WARN</button>
      <button disabled={!canStop} onClick={stop} type="button">STOP</button>
    </>
  );
}

