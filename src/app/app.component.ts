import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonRouterOutlet,
  IonFooter,
  IonButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  grid,
  gridOutline,
  gridSharp,
  people,
  peopleOutline,
  peopleSharp,
  personAdd,
  personAddOutline,
  personAddSharp,
  logOut,
  logOutOutline,
  logOutSharp,
  person,
  personOutline,
  personSharp
} from 'ionicons/icons';

import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
    IonRouterOutlet,
    IonFooter,
    IonButton,
    ToastNotificationComponent
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'grid' },
    { title: 'User Management', url: '/user-management', icon: 'people' },
  ];

  constructor() {
    addIcons({
      grid,
      gridOutline,
      gridSharp,
      people,
      peopleOutline,
      peopleSharp,
      personAdd,
      personAddOutline,
      personAddSharp,
      logOut,
      logOutOutline,
      logOutSharp,
      person,
      personOutline,
      personSharp
    });
  }
}
