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
  IonCardContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonChip,
  IonNote,
  IonText,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonSelect,
  IonSelectOption
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  people,
  peopleOutline,
  peopleCircleOutline,
  shieldCheckmark,
  shieldCheckmarkOutline,
  personAdd,
  personAddOutline,
  notificationsOutline,
  checkmarkCircle,
  ellipseOutline,
  eyeOutline,
  searchOutline,
  homeOutline,
  personOutline,
  logOutOutline
} from 'ionicons/icons';
import { SoloService } from '../../services/solo.service';
import { ToastService } from '../../services/toast.service';
import { SystemUser, UserRole, UserStatus } from '../../models/solo.models';
import { AddAccountModalComponent } from '../../components/add-account-modal/add-account-modal.component';
import { ViewAccountModalComponent } from '../../components/view-account-modal/view-account-modal.component';

type FilterRole = 'ALL' | UserRole;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
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
    IonCardContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonChip,
    IonNote,
    IonText,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    AddAccountModalComponent,
    ViewAccountModalComponent
  ],
})
export class UserManagementPage implements OnInit {
  private soloService = inject(SoloService);
  private toastService = inject(ToastService);

  readonly allUsers = signal<SystemUser[]>(this.soloService.getSystemUsers());
  readonly searchQuery = signal<string>('');
  readonly activeRoleFilter = signal<FilterRole>('ALL');
  readonly statusFilter = signal<'ALL' | UserStatus>('ALL');

  // Computed role category counts
  readonly totalUsersCount = computed(() => this.allUsers().length);
  readonly adminCount = computed(() => this.allUsers().filter(u => u.role === 'ADMIN' || u.role === 'SUPERADMIN').length);
  readonly soloParentCount = computed(() => this.allUsers().filter(u => u.role === 'SOLO PARENT').length);

  // Filtered list based on search + role + status
  readonly filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const roleFilter = this.activeRoleFilter();
    const status = this.statusFilter();

    return this.allUsers().filter(u => {
      const matchesSearch =
        !query ||
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.barangay.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === 'ALL' ||
        (roleFilter === 'ADMIN' ? (u.role === 'ADMIN' || u.role === 'SUPERADMIN') : u.role === roleFilter);

      const matchesStatus = status === 'ALL' || u.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  });

  // Permission requests badge count (static demo)
  readonly permissionRequestsCount = signal<number>(2);

  // Modal visibility signals
  readonly showAddModal = signal<boolean>(false);
  readonly showViewModal = signal<boolean>(false);
  readonly selectedUser = signal<SystemUser | null>(null);

  constructor() {
    addIcons({
      people,
      peopleOutline,
      peopleCircleOutline,
      shieldCheckmark,
      shieldCheckmarkOutline,
      personAdd,
      personAddOutline,
      notificationsOutline,
      checkmarkCircle,
      ellipseOutline,
      eyeOutline,
      searchOutline,
      homeOutline,
      personOutline,
      logOutOutline
    });
  }

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    this.allUsers.set(this.soloService.getSystemUsers());
  }

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  openViewUserModal(user: SystemUser): void {
    this.selectedUser.set(user);
    this.showViewModal.set(true);
  }

  closeViewUserModal(): void {
    this.showViewModal.set(false);
    this.selectedUser.set(null);
  }

  handleToggleStatus(userId: number): void {
    const updated = this.soloService.toggleSystemUserStatus(userId);
    if (updated) {
      this.allUsers.set(this.soloService.getSystemUsers());
      this.selectedUser.set(updated);

      if (updated.status === 'INACTIVE') {
        this.toastService.warning(
          `Account for ${updated.name} has been deactivated.`,
          'Account Deactivated'
        );
      } else {
        this.toastService.success(
          `Account for ${updated.name} has been activated.`,
          'Account Activated'
        );
      }
    }
  }

  onAccountCreated(newUser: SystemUser): void {
    // Prepend to the local signal so the list updates reactively
    this.allUsers.update(users => [newUser, ...users]);
    this.showAddModal.set(false);
  }

  setRoleFilter(role: FilterRole): void {
    this.activeRoleFilter.set(role);
  }

  onSearchChange(event: CustomEvent): void {
    this.searchQuery.set(event.detail.value ?? '');
  }

  onStatusFilterChange(event: CustomEvent): void {
    this.statusFilter.set(event.detail.value as 'ALL' | UserStatus);
  }

  getRoleBadgeClass(role: UserRole): string {
    switch (role) {
      case 'SUPERADMIN': return 'badge-superadmin';
      case 'ADMIN': return 'badge-admin';
      case 'SOLO PARENT': return 'badge-soloparent';
      default: return '';
    }
  }
}
