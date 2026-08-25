import { Injectable } from '@angular/core';
import { StatMetric, ApplicationRecord, AdminOnDuty, AgendaItem, QuickAction, SystemUser } from '../models/solo.models';


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
      contactNo: '0917-555-0104',
      childrenCount: 2,
      monthlyIncome: '₱12,000 / month',
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
      contactNo: '0918-555-0105',
      childrenCount: 1,
      monthlyIncome: '₱8,500 / month',
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
      contactNo: '0919-555-0102',
      childrenCount: 3,
      monthlyIncome: '₱15,000 / month',
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
      contactNo: '0920-555-0103',
      childrenCount: 2,
      monthlyIncome: '₱10,000 / month',
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
      contactNo: '0921-555-0101',
      childrenCount: 1,
      monthlyIncome: '₱18,000 / month',
    },
  ];

  private admins: AdminOnDuty[] = [
    {
      id: 1,
      name: 'Admin Administrator',
      email: 'admin@projectsolo.gov.ph',
      role: 'Federation Head',
      department: 'Executive Office',
      contactNo: '(044) 940-1234',
      isOnline: true,
      statusText: 'ONLINE NOW',
      avatarChar: 'A',
      shiftTime: '8:00 AM - 5:00 PM',
      dateCreated: 'Jan 15, 2026',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@cswdo.gov.ph',
      role: 'LGU Social Welfare Officer',
      department: 'CSWDO / MSWDO',
      contactNo: '(044) 940-5678',
      isOnline: true,
      statusText: 'ONLINE NOW',
      avatarChar: 'J',
      shiftTime: '9:00 AM - 4:00 PM',
      dateCreated: 'Feb 01, 2026',
    },
    {
      id: 3,
      name: 'Mark Bautista',
      email: 'mark.b@cswdo.gov.ph',
      role: 'Case Verifier',
      department: 'Field Assessment Unit',
      contactNo: '(044) 940-9012',
      isOnline: true,
      statusText: 'ONLINE NOW',
      avatarChar: 'M',
      shiftTime: '8:30 AM - 5:30 PM',
      dateCreated: 'Feb 10, 2026',
    },
    {
      id: 4,
      name: 'Sarah Jenkins',
      email: 'sarah.j@projectsolo.gov.ph',
      role: 'Intake Coordinator',
      department: 'Solo Parent Desk',
      contactNo: '(044) 940-3456',
      isOnline: false,
      statusText: 'OFFLINE',
      avatarChar: 'S',
      shiftTime: '8:00 AM - 5:00 PM',
      dateCreated: 'Mar 05, 2026',
    },
    {
      id: 5,
      name: 'Roberto Ramos',
      email: 'roberto.r@projectsolo.gov.ph',
      role: 'Barangay Focal Person',
      department: 'San Josef Sur Liaison',
      contactNo: '(044) 940-7890',
      isOnline: false,
      statusText: 'OFFLINE',
      avatarChar: 'R',
      shiftTime: '8:00 AM - 5:00 PM',
      dateCreated: 'Mar 12, 2026',
    },
    {
      id: 6,
      name: 'Teresa Cruz',
      email: 'teresa.c@projectsolo.gov.ph',
      role: 'Benefits Administrator',
      department: 'Social Assistance Unit',
      contactNo: '(044) 940-2345',
      isOnline: false,
      statusText: 'OFFLINE',
      avatarChar: 'T',
      shiftTime: '9:00 AM - 6:00 PM',
      dateCreated: 'Apr 02, 2026',
    },
    {
      id: 7,
      name: 'Michael Tan',
      email: 'michael.t@projectsolo.gov.ph',
      role: 'System Auditor',
      department: 'IT & Data Verification',
      contactNo: '(044) 940-6789',
      isOnline: false,
      statusText: 'OFFLINE',
      avatarChar: 'M',
      shiftTime: '8:00 AM - 5:00 PM',
      dateCreated: 'May 18, 2026',
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

  toggleUserOnlineStatus(userId: number): void {
    this.admins = this.admins.map(user => {
      if (user.id === userId) {
        const nextOnline = !user.isOnline;
        return {
          ...user,
          isOnline: nextOnline,
          statusText: nextOnline ? 'ONLINE NOW' : 'OFFLINE',
        };
      }
      return user;
    });
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

  private readonly defaultSystemUsers: SystemUser[] = [
    { id: 1, name: 'Admin Administrator', email: 'admin@solo.com', barangay: 'General Luna', role: 'SUPERADMIN', status: 'ACTIVE', avatarChar: 'A' },
    { id: 2, name: 'Jane Doe', email: 'jane.officer@solo.com', barangay: 'San Josef Sur', role: 'ADMIN', status: 'ACTIVE', avatarChar: 'J' },
    { id: 3, name: 'Mark Bautista', email: 'mark.bautista@solo.com', barangay: 'Mabini Extension', role: 'ADMIN', status: 'ACTIVE', avatarChar: 'M' },
    { id: 4, name: 'Maria Santos', email: 'parent@solo.com', barangay: 'Zulueta', role: 'SOLO PARENT', status: 'ACTIVE', avatarChar: 'M' },
    { id: 5, name: 'Juan Dela Cruz', email: 'juan.delacruz@gmail.com', barangay: 'San Josef Norte', role: 'SOLO PARENT', status: 'ACTIVE', avatarChar: 'J' },
    { id: 6, name: 'Rosa Mendoza', email: 'rosa.mendoza@yahoo.com', barangay: 'Mabini Homesite', role: 'SOLO PARENT', status: 'ACTIVE', avatarChar: 'R' },
    { id: 7, name: 'Carlos Reyes', email: 'carlos.reyes@gmail.com', barangay: 'Kapitan Pepe', role: 'SOLO PARENT', status: 'INACTIVE', avatarChar: 'C' },
  ];

  private systemUsers: SystemUser[] = this.loadSystemUsers();

  private loadSystemUsers(): SystemUser[] {
    try {
      const saved = localStorage.getItem('solo_system_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading system users from localStorage', e);
    }
    return [...this.defaultSystemUsers];
  }

  private saveSystemUsers(): void {
    try {
      localStorage.setItem('solo_system_users', JSON.stringify(this.systemUsers));
    } catch (e) {
      console.error('Error saving system users to localStorage', e);
    }
  }

  getSystemUsers(): SystemUser[] {
    return [...this.systemUsers];
  }

  getSystemUsersByRole(role: SystemUser['role']): SystemUser[] {
    return this.systemUsers.filter(u => u.role === role);
  }

  addSystemUser(user: SystemUser): void {
    this.systemUsers = [user, ...this.systemUsers];
    this.saveSystemUsers();
  }
}
