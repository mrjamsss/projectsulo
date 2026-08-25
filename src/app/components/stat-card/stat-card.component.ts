import { Component, input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonIcon,
    IonText,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class StatCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<number>();
  readonly changeText = input<string>('');
  readonly icon = input<string>('stats-chart-outline');
  readonly iconColor = input<string>('primary');
  readonly badgeType = input<'positive' | 'warning' | 'info' | 'success'>('positive');
}
