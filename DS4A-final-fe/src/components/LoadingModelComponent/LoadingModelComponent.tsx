import './LoadingModelComponent.css';
import React, {useState} from 'react';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { documentOutline } from 'ionicons/icons';

interface LoadingModelProps { 
    selectedModel: any
    updateSelectedModel: any
}

const LoadingModelComponent: React.FC<LoadingModelProps> = (props) => {

    const [selectedFile, setSelectedFile] = useState<any>();
    const [isSelected, setIsSelected] = useState(false);
    

	const changeHandler = (event: any) => {
        setIsSelected(true);
		setSelectedFile(event.target.files[0]);
        //console.log("sF", selectedFile);
        //props.updateSelectedModel(selectedFile? selectedFile: 'none')
		
	};

	const handleSubmission = () => {
        //props.updateSelectedModel(selectedFile)
        //props.updateSelectedModel('none')
        console.log("sF", selectedFile);
        props.updateSelectedModel(selectedFile? selectedFile: 'none')
        
        /* const formData = new FormData();
        formData.append('File', selectedFile, 'model');
        console.log("submission", formData, selectedFile); */

        /* fetch(
                'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }; */
	};

    const removeSubmission = ()=>{
        setIsSelected(false);
        setSelectedFile(null);
        props.updateSelectedModel('none');
    }

    return (
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <div className="form__file centered_div">
                            <label htmlFor="checkBank__file" className="form__file-label">
                                <IonIcon icon={documentOutline}></IonIcon>
                                <p className="p">Click here to load your model</p>
                            </label>
                            <input type="file" id='checkBank__file' name="file" onChange={changeHandler} />
                            {isSelected ? (
                                <div className='wide-div'>
                                    <p>Filename: {selectedFile.name.slice(0,10)+'...'+selectedFile.name.slice(selectedFile.name.length - 4)}</p>
                                    <p>Filetype: {selectedFile.type}</p>
                                    <p>Size in bytes: {selectedFile.size}</p>
                                    <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <p>Select a file to show details</p>
                            )}
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                        <IonButton expand='full' shape='round' onClick={handleSubmission}>Save Model</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton expand='full' shape='round' onClick={removeSubmission}>Clean</IonButton>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </IonGrid> 
    )
};

export default LoadingModelComponent;
