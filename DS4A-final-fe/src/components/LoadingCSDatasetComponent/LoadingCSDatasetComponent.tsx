import './LoadingCSDatasetComponent.css';
import React, {useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { camera, trash, close, documentOutline } from 'ionicons/icons';
//require('react-img-carousel/lib/carousel.css');

interface LoadingModelProps { }

const LoadingCSDatasetComponent: React.FC<LoadingModelProps> = () => {
    const [images, setImages] = useState<any>([]);
    const [imageURLS, setImageURLs] = useState<any>([]);
    const [isSelected, setIsSelected] = useState(false);

    const [sImages, setSImages] = useState<any>([]);
    const [sImagesURLS, setSImageURLs] = useState<any>([]);
    const [isSSelected, setIsSSelected] = useState(false);
        

    useEffect(() => {
      if (images.length < 1) return;
      const newImageUrls: any = [];
      images.forEach((image:any) => newImageUrls.push(URL.createObjectURL(image)));
      setImageURLs(newImageUrls);
    }, [images]);

    useEffect(() => {
        if (sImages.length < 1) return;
        const newImageUrls: any = [];
        sImages.forEach((image:any) => newImageUrls.push(URL.createObjectURL(image)));
        setSImageURLs(newImageUrls);
      }, [sImages]);
  
    function onImageChange(e: any) {
      setImages([...e.target.files]);
      setIsSelected(true);
    }

    function onSImageChange(e: any){
        setSImages([...e.target.files]);
        setIsSSelected(true);
    }
  
    return (
      <>
        <IonGrid>
            <IonRow className=''>
                <IonCol size='6' className="form__file centered_div">
                    <div>
                        <label htmlFor="files" className="form__file-label">
                            <IonIcon icon={documentOutline}></IonIcon>
                            <p className="p">Click here to load your initial dataset</p>
                        </label>
                        <input type="file" id='files' multiple accept="image/*" onChange={onImageChange}/>
                        { 
                            isSelected?
                            (   
                                <div className='scroll-y'>
                                    <Carousel showArrows={true} >
                                        {
                                            imageURLS.map((imageSrc: any, index: any) => (
                                                <div key="{'div_'+index}" className='img-div'>
                                                    <img src={imageSrc} key="{img_'+index}"  alt="not found"  />
                                                    
                                                </div>
                                            ))
                                        }
                                    </Carousel>
                                </div>
                                
                            ) : <p>Select a file or a set of files to show details</p>

                        } 
                    </div>
                </IonCol>
                <IonCol size='6' className="form__file centered_div">
                    <div>
                        <label htmlFor="sfiles" className="form__file-label">
                            <IonIcon icon={documentOutline}></IonIcon>
                            <p className="p">Click here to load your hidden dataset</p>
                        </label>
                        <input type="file" id='sfiles' multiple accept="image/*" onChange={onSImageChange}/>

                    </div>
                    { 
                        isSSelected?
                        (
                            <div className='scroll-y'>
                                <Carousel showArrows={true}>
                                    {
                                        sImagesURLS.map((imageSrc: any, index: any) => (
                                            <div key="{'div_'+index}" className='img-div'>
                                                <img src={imageSrc} key="{img_'+index}"  alt="not found"  />
                                            </div> 
                                        ))
                                    }
                                </Carousel>
                            </div>
                            
                        ) : <p>Select a file or a set of files to show details</p>
                    } 
                </IonCol>
            </IonRow>
        </IonGrid>
      </>
    );
};

export default LoadingCSDatasetComponent;
