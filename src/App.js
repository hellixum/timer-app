import {useState, useEffect} from 'react'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

import Timer from './components/Timer';
import History from './components/History';

import './styles.css';

function App() {

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  // isActive and isPaused are used to know whether the stopwatch is  running or paused 

  const [time, setTime] = useState(0);
  // time varibale will have the value of milliseconds passes after the start of stopwatch
  const [history, setHistory] = useState([]); 
  //history is an array of all the activity done(Start, Pause, Resume, Reset) and timer value at that time
  
  // every time the state of stopwatch is changed the component is rerendered using useEffect()
  useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  // fucntions with prefix handle are used to change the state of Stopwatch 
  // and will add the repective state change to the history

  const handleStart = () => {
    if(isPaused === true){
      let temp = {timerValue: time, action: "Start"}; 
      setHistory([...history, temp])
    }

    setIsActive(true);
    setIsPaused(false);
  };
  
  const handlePauseResume = () => {
    if(time === 0)
      return;
    let action = "Pause"; 
    if(isPaused){
      action = "Resume";
    }
    let temp = {timerValue: time, action}; 
    setHistory([...history, temp]);
    setIsPaused(!isPaused);
  };
  
  const handleReset = () => {
    if(time !== 0){
      let temp = {timerValue: time, action: "Reset"}; 
      setHistory([...history, temp]);
    }
    setIsActive(false);
    setTime(0);
  };

  // Timer component is used to show the stopwatch and the timer value is passed as props
  // History component is used to show the history and histoty array is passed as props which contains all the state changes
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Timer time={time} handleStart={handleStart} handlePauseResume={handlePauseResume} handleReset={handleReset} isPaused={isPaused}/>
          </Route>
          <Route exact path='/history'>
            <History history={history}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
