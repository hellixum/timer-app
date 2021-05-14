import {useState, useEffect} from 'react'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

import Timer from './components/Timer';
import History from './components/History';

import './styles.css';

function App() {

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState([]); 
  
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
