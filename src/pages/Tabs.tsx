import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonContent,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import {homeOutline,calendarOutline,searchCircleOutline} from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Tabs.css';

import Tab2 from './Tab2';
import Tab3 from './Tab3';



const Tabs: React.FC = () => {

    return(
    
      <IonReactRouter>
     <IonTabs>
         <IonRouterOutlet>
          <Route path="/tab1" exact={true} />
          <Route path="/tab2"  component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} exact={true} />
          <Route path="/Tabs" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>
      <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={searchCircleOutline} />
            <IonLabel>Search Recipe</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Meal Plan</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
   </IonReactRouter>
  
  );
};

export default Tabs;