import React, { useEffect, useState } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonApp,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/react';

const App = () => {
  const [ puppers, setPuppers ] = useState([]);

  useEffect(() => {
    async function fetchPuppers() {
      const ret = await fetch('https://dog.ceo/api/breeds/image/random/10');
      const json = await ret.json();
      setPuppers(json.message);
    }
    fetchPuppers();
  }, []);

  return (
    <IonApp>
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
    </IonApp>
  );
}

export default App;