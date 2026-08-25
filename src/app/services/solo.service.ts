import { Injectable } from '@angular/core';
import { StatMetric, ApplicationRecord, AdminOnDuty, AgendaItem, QuickAction } from '../models/solo.models';

@Injectable({
  providedIn: 'root',
})
export class SoloService {
  private readonly stats: StatMetric[] = [
    {
      id: 1,
      title: 'TOTAL SOLO PARENTS',
      value: 4,
      changeText: '+12% THIS MO.',
      icon: 'people-outline',
      iconColor: 'primary',
      badgeType: 'positive',
    },
    {
      id: 2,
      title: 'TOTAL APPLICATIONS',
      value: 5,
      changeText: '5 PENDING REVIEW',
      icon: 'trending-up-outline',
      iconColor: 'warning',
      badgeType: 'warning',
    },
    {
      id: 3,
      title: "TODAY'S INTERVIEWS",
      value: 2,
      changeText: 'ACTIVE SLOTS',
      icon: 'clipboard-outline',
      iconColor: 'tertiary',
      badgeType: 'info',
    },
    {
      id: 4,
      title: 'ADMINS ON DUTY',
      value: 3,
      changeText: 'ONLINE NOW',
      icon: 'shield-checkmark-outline',
      iconColor: 'success',
      badgeType: 'success',
    },
  ];

  private readonly quickActions: QuickAction[] = [
    { id: 1, title: 'Add Applicant', icon: 'add-circle-outline', route: '/add-account', color: 'primary' },
    { id: 2, title: 'Add Account', icon: 'person-add-outline', route: '/add-account', color: 'secondary' },
    { id: 3, title: 'Announce', icon: 'megaphone-outline', route: '/dashboard', color: 'tertiary' },
    { id: 4, title: 'Manage Users', icon: 'people-circle-outline', route: '/dashboard', color: 'dark' },
  ];

  private applications: ApplicationRecord[] = [
    {
      id: 1,
      appNo: 'APP-004',
      applicantName: 'Carlos Reyes',
      barangay: 'KAPITAN PEPE',
      status: 'PENDING',
      date: 'Aug 25, 2026',
      avatarChar: 'C',
      avatarColor: '#1e3a5f',
      category: 'Solo Parent Support',
    },
    {
      id: 2,
      appNo: 'APP-005',
      applicantName: 'Elena Garcia',
      barangay: 'BITAS',
      status: 'NEW',
      date: 'Aug 25, 2026',
      avatarChar: 'E',
      avatarColor: '#0b4f4f',
      category: 'Educational Subsidy',
    },
    {
      id: 3,
      appNo: 'APP-002',
      applicantName: 'Juan Dela Cruz',
      barangay: 'SAN JOSEF SUR',
      status: 'FOR INTERVIEW',
      date: 'Aug 24, 2026',
      avatarChar: 'J',
      avatarColor: '#1b4d6b',
      category: 'Livelihood Assistance',
    },
    {
      id: 4,
      appNo: 'APP-003',
      applicantName: 'Rosa Mendoza',
      barangay: 'MABINI HOMESITE',
      status: 'FOR INTERVIEW',
      date: 'Aug 24, 2026',
      avatarChar: 'R',
      avatarColor: '#2d3748',
      category: 'Healthcare Access',
    },
    {
      id: 5,
      appNo: 'APP-001',
      applicantName: 'Maria Santos',
      barangay: 'ZULUETA',
      status: 'APPROVED',
      date: 'Aug 23, 2026',
      avatarChar: 'M',
      avatarColor: '#064e3b',
      category: 'Solo Parent ID Card',
    },
  ];

  private readonly admins: AdminOnDuty[] = [
    {
      id: 1,
      name: 'Admin Administrator',
      role: 'Federation Head',
      isOnline: true,
      statusText: 'ONLINE NOW',
      avatarChar: 'A',
      shiftTime: '8:00 AM - 5:00 PM',
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'LGU Social Welfare Officer',
      isOnline: true,
      statusText: 'ONLINE NOW',
      avatarChar: 'J',
      shiftTime: '9:00 AM - 4:00 PM',
    },
    {
      id: 3,
      name: 'Mark Bautista',
      role: 'Case Verifier',
      isOnline: true,
      statusText: 'ONLINE NOW',
      avatarChar: 'M',
      shiftTime: '8:30 AM - 5:30 PM',
    },
  ];

  private readonly agendas: AgendaItem[] = [
    {
      id: 1,
      title: 'Juan Dela Cruz',
      subtitle: 'Applicant Slot',
      time: '9:30 AM',
      category: 'INTERVIEW',
      categoryColor: 'primary',
    },
    {
      id: 2,
      title: 'Rosa Mendoza',
      subtitle: 'Applicant Slot',
      time: '2:00 PM',
      category: 'INTERVIEW',
      categoryColor: 'primary',
    },
    {
      id: 3,
      title: 'Admin Administrator',
      subtitle: 'Duty Schedule',
      time: '8:00 AM - 5:00 PM',
      category: 'DUTY_ADMIN',
      categoryColor: 'success',
    },
    {
      id: 4,
      title: 'Jane Doe',
      subtitle: 'Duty Schedule',
      time: '9:00 AM - 4:00 PM',
      category: 'DUTY_ADMIN',
      categoryColor: 'success',
    },
    {
      id: 5,
      title: 'RA 11861 Orientation',
      subtitle: 'Monthly Beneficiaries General Assembly',
      time: '3:00 PM',
      category: 'ANNOUNCEMENT',
      categoryColor: 'tertiary',
    },
  ];

  getStats(): StatMetric[] {
    return [...this.stats];
  }

  getQuickActions(): QuickAction[] {
    return [...this.quickActions];
  }

  getApplications(): ApplicationRecord[] {
    return [...this.applications];
  }

  getAdminsOnDuty(): AdminOnDuty[] {
    return [...this.admins];
  }

  getAgendas(): AgendaItem[] {
    return [...this.agendas];
  }

  addApplication(application: Omit<ApplicationRecord, 'id' | 'avatarChar' | 'avatarColor'>): void {
    const newRecord: ApplicationRecord = {
      ...application,
      id: Date.now(),
      avatarChar: application.applicantName.charAt(0).toUpperCase() || 'A',
      avatarColor: '#0b4f4f',
    };
    this.applications = [newRecord, ...this.applications];
  }
}
