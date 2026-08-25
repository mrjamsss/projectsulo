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
  closeCircleOutline,
  documentTextOutline,
  statsChartOutline,
  personOutline,
  logOutOutline,
  mailOutline,
  businessOutline,
  callOutline,
  pauseOutline,
  playOutline,
  locationOutline,
  cashOutline
} from 'ionicons/icons';
import { SoloService } from '../../services/solo.service';
import { ApplicationRecord, AdminOnDuty } from '../../models/solo.models';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { UserDetailModalComponent } from '../../components/user-detail-modal/user-detail-modal.component';
import { ApplicationDetailModalComponent } from '../../components/application-detail-modal/application-detail-modal.component';

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
    ApplicationCardComponent,
    UserDetailModalComponent,
    ApplicationDetailModalComponent
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

  // Modal State Signals
  readonly selectedApplication = signal<ApplicationRecord | null>(null);
  readonly isAppModalOpen = signal<boolean>(false);

  readonly selectedUser = signal<AdminOnDuty | null>(null);
  readonly isUserModalOpen = signal<boolean>(false);

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
      closeCircleOutline,
      documentTextOutline,
      statsChartOutline,
      personOutline,
      logOutOutline,
      mailOutline,
      businessOutline,
      callOutline,
      pauseOutline,
      playOutline,
      locationOutline,
      cashOutline
    });
  }

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    this.admins.set(this.soloService.getAdminsOnDuty());
    this.applications.set(this.soloService.getApplications());
  }

  onSegmentChange(event: CustomEvent): void {
    const value = event.detail.value as 'applications' | 'users';
    if (value) {
      this.activeSegment.set(value);
    }
  }

  handleApplicationSelection(application: ApplicationRecord): void {
    this.selectedApplication.set(application);
    this.isAppModalOpen.set(true);
  }

  closeAppModal(): void {
    this.isAppModalOpen.set(false);
    this.selectedApplication.set(null);
  }

  handleUserSelection(user: AdminOnDuty): void {
    this.selectedUser.set(user);
    this.isUserModalOpen.set(true);
  }

  closeUserModal(): void {
    this.isUserModalOpen.set(false);
    this.selectedUser.set(null);
  }

  handleUserStatusToggle(userId: number): void {
    this.soloService.toggleUserOnlineStatus(userId);
    this.admins.set(this.soloService.getAdminsOnDuty());
    const updated = this.admins().find(u => u.id === userId) || null;
    this.selectedUser.set(updated);
  }
}
