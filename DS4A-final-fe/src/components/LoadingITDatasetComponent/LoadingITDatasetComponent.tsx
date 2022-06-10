import './LoadingITDatasetComponent.css';
import React, {useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { camera, trash, close, documentOutline } from 'ionicons/icons';
//require('react-img-carousel/lib/carousel.css');

interface LoadingModelProps { 
    updateSelectedDataset: any
}

const LoadingITDatasetComponent: React.FC<LoadingModelProps> = (props) => {
    const [images, setImages] = useState<any>([]);
    const [imageURLS, setImageURLs] = useState<any>([]);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      if (images.length < 1) return;
      const newImageUrls: any = [];
      images.forEach((image:any) => newImageUrls.push(URL.createObjectURL(image)));
      setImageURLs(newImageUrls);
    }, [images]);
  
    function onImageChange(e: any) {
      setImages([...e.target.files]);
      setIsSelected(true);
      
    }

    function updateDataset(e: any){
        props.updateSelectedDataset(images? {dataset: images}: {dataset:'none'});
    }

    const removeSubmission = ()=>{
        setImages([]);
        setIsSelected(false);
        props.updateSelectedDataset({dataset: 'none'});
    }
  
    return (
      <>
        <div className="form__file centered_div">
            <label htmlFor="files" className="form__file-label">
                <IonIcon icon={documentOutline}></IonIcon>
                <p className="p">Click here to load your dataset</p>
            </label>
            <input type="file" id='files' multiple accept="image/*" onChange={onImageChange}/>
            {
                isSelected?(
                    <IonGrid className='scroll-y'>
                        <IonRow>
                            <IonCol>
                                <Carousel showArrows={true}>
                                    {
                                        imageURLS.map((imageSrc: any, index: any) => (
                                            <div key="{'div_'+index}" className='img-div'>
                                                <img src={imageSrc} key="{img_'+index}"  alt="not found"  />
                                                <p className="legend" key="{'label_'+index}">{imageSrc}</p>
                                            </div>
                                        ))
                                    }
                                </Carousel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton shape='round' expand='full' onClick={updateDataset}>Load Dataset</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton shape='round' expand='full' onClick={removeSubmission}>Clear</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                ) : <p>Select a file or a set of files to show details</p>

            }
        </div>
      </>
    );
};

export default LoadingITDatasetComponent;
