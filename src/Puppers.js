import React, { useCallback, useContext, useEffect, useState } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonCard,
  IonCardContent,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { AppContext } from './App';

export const Puppers = () => {
  const { state, dispatch } = useContext(AppContext);
  const [ puppers, setPuppers ] = useState(state.puppers);

  const fetchPuppers = useCallback(async() => {
    const ret = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const json = await ret.json();
    setPuppers(json.message);
    dispatch({
      type: 'setPuppers',
      puppers: json.message
    })
  }, [dispatch]);

  useEffect(() => {
    fetchPuppers();
  }, [fetchPuppers]);

  return (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Puppers</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => fetchPuppers()}>
            <IonIcon icon="refresh" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {puppers.map(pupper => {
        return (
          <IonCard key={pupper}>
            <IonCardContent>
              <img src={pupper} />
            </IonCardContent>
          </IonCard>
        )
      })}
    </IonContent>
  </>
  );
}