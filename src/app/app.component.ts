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
    IonButton
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'grid' },
    { title: 'User Management', url: '/add-account', icon: 'people' },
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
