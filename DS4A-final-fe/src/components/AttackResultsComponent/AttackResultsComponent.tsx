import { IonCol, IonGrid, IonRow } from '@ionic/react';
import ReactECharts from 'echarts-for-react';
import './AttackResultsComponent.css';

interface AttackResultsComponentProps { }

const AttackResultsComponent: React.FC<AttackResultsComponentProps> = () => {

    function getOption(){
        const data = [
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
            [Math.floor(Math.random() * 35) + 1, Math.floor(Math.random() * 75) + 25, Math.floor(Math.random() * 100) + 75],
          ];
          // prettier-ignore
          const cities = ['Accuracy','Error rate', 'Sensitivity', 'Specificity' , 'Confidence' , 'Recall' , 'Precision', 'F-score' , 'Recall' ];
          const barHeight = 50;
          const option = {
            title: {
              text: 'Model performance',
              subtext: 'Data from Tensorflow custom implementation'
            },
            legend: {
              show: true,
              top: 'bottom',
              data: ['Range', 'Average']
            },
            grid: {
              top: 100
            },
            angleAxis: {
              type: 'category',
              data: cities
            },
            tooltip: {
              show: true,
              formatter: function (params:any) {
                const id = params.dataIndex;
                return (
                  cities[id] +
                  '<br>Lowest：' +
                  data[id][0] +
                  '<br>Highest：' +
                  data[id][1] +
                  '<br>Average：' +
                  data[id][2]
                );
              }
            },
            radiusAxis: {},
            polar: {},
            series: [
              {
                type: 'bar',
                itemStyle: {
                  color: 'transparent'
                },
                data: data.map(function (d) {
                  return d[0];
                }),
                coordinateSystem: 'polar',
                stack: 'Min Max',
                silent: true
              },
              {
                type: 'bar',
                data: data.map(function (d) {
                  return d[1] - d[0];
                }),
                coordinateSystem: 'polar',
                name: 'Range',
                stack: 'Min Max'
              },
              {
                type: 'bar',
                itemStyle: {
                  color: 'transparent'
                },
                data: data.map(function (d) {
                  return d[2] - barHeight;
                }),
                coordinateSystem: 'polar',
                stack: 'Average',
                silent: true,
                z: 10
              },
              {
                type: 'bar',
                data: data.map(function (d) {
                  return barHeight * 2;
                }),
                coordinateSystem: 'polar',
                name: 'Average',
                stack: 'Average',
                barGap: '-100%',
                z: 10
              }
            ]
          };
        return option
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
                <ReactECharts option={getOption()} />
            </IonCol>
        </IonRow>
         
    </IonGrid>
   
  );
};

export default AttackResultsComponent;
