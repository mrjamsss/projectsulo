import { Injectable } from '@angular/core';

export interface UserAccount {
  id: number;
  fullName: string;
  email: string;
  role: string;
  department: string;
  status: 'ACTIVE' | 'INACTIVE';
  avatarChar: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: UserAccount[] = [
    {
      id: 1,
      fullName: 'Admin Administrator',
      email: 'admin@projectsolo.gov.ph',
      role: 'Federation Head',
      department: 'Executive Board',
      status: 'ACTIVE',
      avatarChar: 'A',
    },
    {
      id: 2,
      fullName: 'Jane Doe',
      email: 'jane.doe@projectsolo.gov.ph',
      role: 'LGU Social Welfare Officer',
      department: 'CSWDO / MSWDO',
      status: 'ACTIVE',
      avatarChar: 'J',
    },
    {
      id: 3,
      fullName: 'Mark Bautista',
      email: 'mark.b@projectsolo.gov.ph',
      role: 'Case Verifier',
      department: 'Field Assessment',
      status: 'ACTIVE',
      avatarChar: 'M',
    },
  ];

  getAccounts(): UserAccount[] {
    return [...this.accounts];
  }

  addAccount(account: Omit<UserAccount, 'id' | 'avatarChar'>): void {
    const newAcc: UserAccount = {
      ...account,
      id: Date.now(),
      avatarChar: account.fullName.charAt(0).toUpperCase() || 'U',
    };
    this.accounts = [newAcc, ...this.accounts];
  }
}
