export interface StatMetric {
  id: number;
  title: string;
  value: number;
  changeText: string;
  icon: string;
  iconColor: string;
  badgeType: 'positive' | 'warning' | 'info' | 'success';
}

export interface ApplicationRecord {
  id: number;
  appNo: string;
  applicantName: string;
  barangay: string;
  status: 'PENDING' | 'NEW' | 'FOR INTERVIEW' | 'APPROVED' | 'REJECTED';
  date: string;
  avatarChar: string;
  avatarColor: string;
  category: string;
}

export interface AdminOnDuty {
  id: number;
  name: string;
  role: string;
  isOnline: boolean;
  statusText: string;
  avatarChar: string;
  shiftTime: string;
}

export interface AgendaItem {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  category: 'INTERVIEW' | 'DUTY_ADMIN' | 'ANNOUNCEMENT';
  categoryColor: string;
}

export interface QuickAction {
  id: number;
  title: string;
  icon: string;
  route: string;
  color: string;
}
