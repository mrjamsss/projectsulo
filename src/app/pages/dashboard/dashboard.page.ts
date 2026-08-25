import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  IonChip,
  IonNote,
  IonText,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  grid,
  gridOutline,
  gridSharp,
  people,
  peopleOutline,
  peopleSharp,
  peopleCircleOutline,
  trendingUp,
  trendingUpOutline,
  clipboard,
  clipboardOutline,
  shieldCheckmark,
  shieldCheckmarkOutline,
  addCircleOutline,
  personAdd,
  personAddOutline,
  personAddSharp,
  megaphoneOutline,
  calendarOutline,
  timeOutline,
  chevronForwardOutline,
  chevronBackOutline,
  checkmarkCircleOutline,
  sparklesOutline,
  closeOutline,
  documentTextOutline,
  statsChartOutline,
  personOutline,
  logOutOutline
} from 'ionicons/icons';
import { SoloService } from '../../services/solo.service';
import { ApplicationRecord } from '../../models/solo.models';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonBadge,
    IonChip,
    IonNote,
    IonText,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    StatCardComponent,
    ApplicationCardComponent
  ],
})
export class DashboardPage implements OnInit {
  // Service injection via modern inject() function (Unit 1.2)
  private soloService = inject(SoloService);

  // Writable Signals for state management (Unit 1.3)
  readonly currentDate = signal<string>('AUG 25, 2026');
  readonly currentMonth = signal<string>('AUGUST 2026');
  readonly userName = signal<string>('Admin Administrator');
  readonly userRole = signal<string>('Federation Head');
  readonly activeSegment = signal<'applications' | 'users'>('applications');
  readonly selectedApplication = signal<ApplicationRecord | null>(null);

  // State loaded from SoloService
  readonly stats = signal(this.soloService.getStats());
  readonly quickActions = signal(this.soloService.getQuickActions());
  readonly applications = signal(this.soloService.getApplications());
  readonly admins = signal(this.soloService.getAdminsOnDuty());
  readonly agendas = signal(this.soloService.getAgendas());

  // Computed Signals for derived data (Unit 1.3)
  readonly totalApplicationsCount = computed(() => this.applications().length);
  readonly onlineAdminsCount = computed(() => this.admins().filter(a => a.isOnline).length);
  readonly interviewAgendas = computed(() => this.agendas().filter(a => a.category === 'INTERVIEW'));
  readonly dutyAdminAgendas = computed(() => this.agendas().filter(a => a.category === 'DUTY_ADMIN'));
  readonly announcementAgendas = computed(() => this.agendas().filter(a => a.category === 'ANNOUNCEMENT'));

  constructor() {
    addIcons({
      grid,
      gridOutline,
      gridSharp,
      people,
      peopleOutline,
      peopleSharp,
      peopleCircleOutline,
      trendingUp,
      trendingUpOutline,
      clipboard,
      clipboardOutline,
      shieldCheckmark,
      shieldCheckmarkOutline,
      addCircleOutline,
      personAdd,
      personAddOutline,
      personAddSharp,
      megaphoneOutline,
      calendarOutline,
      timeOutline,
      chevronForwardOutline,
      chevronBackOutline,
      checkmarkCircleOutline,
      sparklesOutline,
      closeOutline,
      documentTextOutline,
      statsChartOutline,
      personOutline,
      logOutOutline
    });
  }

  ngOnInit(): void {}

  onSegmentChange(event: CustomEvent): void {
    const value = event.detail.value as 'applications' | 'users';
    if (value) {
      this.activeSegment.set(value);
    }
  }

  handleApplicationSelection(application: ApplicationRecord): void {
    this.selectedApplication.set(application);
  }

  clearSelectedApplication(): void {
    this.selectedApplication.set(null);
  }
}
