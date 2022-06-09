import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import AttackResultsComponent from '../components/AttackResultsComponent/AttackResultsComponent';
import LoadingCSDatasetComponent from '../components/LoadingCSDatasetComponent/LoadingCSDatasetComponent';
import LoadingDatasetComponent from '../components/LoadingITDatasetComponent/LoadingDatasetComponent';
import LoadingModelComponent from '../components/LoadingModelComponent/LoadingModelComponent';
import './Home.css';

const Home: React.FC = () => {

  const [attackVector, setAttackVector] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<any>({ model: 'none'});

  const attackModel = () => {
    console.log("attack vector", attackVector);
    console.log("selected model", selectedModel);
  }

  const updateSelectedModel = (_model: any)=>{
    setSelectedModel({model: _model});
  }

  const databaseSelector = () => {
    return(
      attackVector === 'IT'? 
        <IonCard className='ComponentCard'>
          <IonCardHeader>
            <IonCardTitle>LOAD YOUR I.T. DATASET</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <LoadingDatasetComponent></LoadingDatasetComponent>
          </IonCardContent>
        </IonCard>: 

      attackVector === 'CS'? 
        <IonCard className='ComponentCard'>
          <IonCardHeader>
            <IonCardTitle>LOAD YOUR C.S. DATASET</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <LoadingCSDatasetComponent></LoadingCSDatasetComponent>
          </IonCardContent>
        </IonCard>: 

      attackVector === 'PS'? 
        <IonCard className='ComponentCard'>
          <IonCardHeader>
            <IonCardTitle>LOAD YOUR P.S. DATASET</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <LoadingDatasetComponent></LoadingDatasetComponent>
          </IonCardContent>
        </IonCard>: null
    )
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="primary">
            DS4A + NVD | AI Model attack interface
          </IonTitle>
          <IonItem slot='start' className='longItem'>
              <IonLabel>Attack Vector</IonLabel>
              <IonSelect value={attackVector} placeholder="Select One" onIonChange={e => setAttackVector(e.detail.value)}>
                <IonSelectOption value="IT">Image tampering</IonSelectOption>
                <IonSelectOption value="CS">Compound with Stegranography</IonSelectOption>
                <IonSelectOption value="PS">Preloaded with Stegranography</IonSelectOption>
              </IonSelect>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">DS4A + NVD | AI Model attack interface</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size='4'>
              <IonCard className='ComponentCard'>
                <IonCardHeader>
                  <IonCardTitle>LOAD YOUR MODEL</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <LoadingModelComponent selectedModel={selectedModel} updateSelectedModel={updateSelectedModel}></LoadingModelComponent>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size='8'>
              { databaseSelector() }
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton expand="full" shape="round" onClick={attackModel}>ATTACK LOADED MODEL</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonCard>
                <IonCardHeader>
                  <IonCardTitle>ATTACK ANALYSIS</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <AttackResultsComponent></AttackResultsComponent>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
