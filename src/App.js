import React, { createContext, useEffect, useReducer } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonApp
} from '@ionic/react';
import { Puppers } from './Puppers';
import { useLocalStorage } from './useLocalStorage';

export const AppContext = createContext();

const initialState = {
  puppers: []
}

const reducer = (state, action) => {
  if (action.type === 'setPuppers') {
    return { ...state, puppers: action.puppers }
  }
  return state;
}

const AppContextProvider = (props) => {
  const [data, setData ] = useLocalStorage('data', initialState);

  let [state, dispatch] = useReducer(reducer, data);

  let value = { state, dispatch };

  useEffect(() => {
    setData(state);
  }, [state, setData]);


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

const App = () => {
  return (
    <IonApp>
      <AppContextProvider>
        <Puppers />
      </AppContextProvider>
    </IonApp>
  );
}

export default App;