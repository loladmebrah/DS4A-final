import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import AttackResultsComponent from '../components/AttackResultsComponent/AttackResultsComponent';
import LoadingDatasetComponent from '../components/LoadingDatasetComponent/LoadingDatasetComponent';
import LoadingModelComponent from '../components/LoadingModelComponent/LoadingModelComponent';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DS4A + NVD | AI Model attack interface</IonTitle>
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
            <IonCol size='6'>
              <IonCard className='ComponentCard'>
                <IonCardHeader>
                  <IonCardTitle>LOAD YOUR MODEL</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <LoadingModelComponent></LoadingModelComponent>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size='6'>
              <IonCard className='ComponentCard'>
                <IonCardHeader>
                  <IonCardTitle>LOAD YOUR DATASET</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <LoadingDatasetComponent></LoadingDatasetComponent>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton expand="full" shape="round">ATTACK LOADED MODEL</IonButton>
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
