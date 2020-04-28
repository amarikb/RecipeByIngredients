import React from 'react';
import {
  IonSlides, 
  IonSlide, 
  IonContent,
} from '@ionic/react';
import {GoogleLoginButton } from "react-social-login-buttons";
import { useFirebase } from '../hooks/useFirebase';


import './Home.css';

const slideOpts = {
  initialSlide: 0,
};


const Home: React.FC = () => {
  
   const {googleLogin} = useFirebase();
 return(
    <IonContent>
    <IonSlides className="slider bodyType " pager={true} scroll-x="false" options={slideOpts}>
    
      <IonSlide id="slide1">
  
        
        <div className="backgroundImg"> </div>
        <div className="text textStyle slide"> 
        <img className="slideimg slide" src="assets/icon/icon2.png"  alt="ingredients background img"/>
        <h1>Recipezilla</h1> 
        </div>
       
        
      </IonSlide>
      <IonSlide id="slide2">
        <div className="backgroundImg2 imgLocation"> </div>
        <div className="slide2"> 
        <h1>Discover <br/> new recipes</h1> 
        <h3> Collect ingredients that exist in your home. Search for a recipe that includes these ingredients. Prepare and cook the recipe. Save the recipe for future use like a cookbook or share it to the community!</h3>
        </div>
      </IonSlide>
      <IonSlide className="slide3">
         <div className="backgroundImg3"> </div>
        <img src="assets/icon/icon2.png" alt="food background img" />
        <h1>Recipezilla</h1>
        <h3>Search recipes by ingredients.</h3>

         <GoogleLoginButton style={{width: '205px'}} className="button1" onClick={() => googleLogin()} />
  
    
      </IonSlide>
    </IonSlides>
  </IonContent>

  )
 }


export default Home;

