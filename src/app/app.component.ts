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
  IonButton,
  IonText,
  IonAvatar
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  grid,
  gridOutline,
  gridSharp,
  personAdd,
  personAddOutline,
  personAddSharp,
  logOut,
  logOutOutline,
  logOutSharp,
  person,
  personOutline,
  personSharp,
  people,
  peopleOutline,
  shieldCheckmark,
  shieldCheckmarkOutline
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
    IonButton,
    IonText,
    IonAvatar
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'grid' },
    { title: 'Add Account', url: '/add-account', icon: 'person-add' },
  ];

  constructor() {
    addIcons({
      grid,
      gridOutline,
      gridSharp,
      personAdd,
      personAddOutline,
      personAddSharp,
      logOut,
      logOutOutline,
      logOutSharp,
      person,
      personOutline,
      personSharp,
      people,
      peopleOutline,
      shieldCheckmark,
      shieldCheckmarkOutline
    });
  }
}
