import './LoadingPSDatasetComponent.css';
import React, {useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { camera, trash, close, documentOutline } from 'ionicons/icons';
//require('react-img-carousel/lib/carousel.css');

interface LoadingModelProps { 
    updateSelectedDataset: any
}

const LoadingPSDatasetComponent: React.FC<LoadingModelProps> = (props) => {
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
      props.updateSelectedDataset(images);
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
                ) : <p>Select a file or a set of files to show details</p>

            }
        </div>
      </>
    );
};

export default LoadingPSDatasetComponent;
