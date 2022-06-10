import { IonCol, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton, IonSelect } from '@ionic/react';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import renderer from './GetChartOptions';
import './AttackResultsComponent.css';

interface AttackResultsComponentProps { }

const AttackResultsComponent: React.FC<AttackResultsComponentProps> = () => {
    const [selectedChartOptions, setSelectedChartOptions] = useState<any>({})

    function updateChartOptions(selectedChart: any){
        const render: any = renderer();
        console.log("setting value to render", render[selectedChart]);
        setSelectedChartOptions(render[selectedChart])
    }


  return (
    <IonGrid>
        <IonRow>
            <IonCol>
                <div>
                    <p>Accuracy : {'50%'}</p>
                    <p>Error rate: {'50%'}</p>
                    <p>Sensitivity: {'50%'}</p>
                    <p>Specificity : {'50%'}</p>
                    <p>Confidence : {'50%'}</p>
                    <p>Recall : {'50%'}</p>
                    <p>Precision  : {'50%'}</p>
                    <p>F-score : {'50%'}</p>
                    <p>Recall : {'50%'}</p>
                </div>
            </IonCol>
            <IonCol>
                <IonSegment onIonChange={ e => updateChartOptions(e.detail.value)}>
                  <IonSegmentButton value="linerace">
                    <IonLabel>Line Race</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="radialpolar">
                    <IonLabel>Radial Polar</IonLabel>
                  </IonSegmentButton>
                  {/* <IonSegmentButton value="radar">
                    <IonLabel>Radar</IonLabel>
                  </IonSegmentButton> */}
                  <IonSegmentButton value="3dscatter">
                    <IonLabel>3d Scatter with matrix</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
                <ReactECharts option={selectedChartOptions} />
            </IonCol>
        </IonRow>
         
    </IonGrid>
   
  );
};

export default AttackResultsComponent;
