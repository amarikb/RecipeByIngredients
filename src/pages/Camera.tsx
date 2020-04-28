import React, {useEffect} from 'react';
import { useLocation, useHistory} from 'react-router-dom';
import { 
  IonContent, 
  IonPage, 
  IonButton,
  IonFabButton,
  IonIcon,
  IonFab
   } from '@ionic/react';

import {camera} from 'ionicons/icons';

import './Camera.css';
import { usePhotoGallery} from '../hooks/usePhotoGallery';



const Camera: React.FC = () => {
   



 const location = useLocation();
 const history = useHistory();
 const {takePhoto, setRecipe,
      setMess,setRec} = usePhotoGallery();
  
   useEffect(() => {
    const state = location.state
   
    console.log((state as any)?.text);
    console.log((state as any)?.recipe);
    setMess((location.state as any)?.text); 
    setRecipe((location.state as any)?.recipe);
    setRec((location.state as any)?.recipes);
  },[]);



  return (
    <IonPage className="bImg2">
      <IonContent>
     
         <IonFab vertical="center" horizontal="center" slot="fixed">
          <IonFabButton onClick={() =>{ takePhoto(true)}} style={{width: "100px",height: "100px"}}>
          <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
          </IonFab>
    
        <IonButton  onClick={() => history.goBack()} color="dark" style={{width: "150px",height: "50px"}}>Back</IonButton>

       

      
     </IonContent>
    </IonPage>
  
  )
          

}

export default Camera;
