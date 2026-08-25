# 🎓 Project SOLO — Presentation & Defense Guide (With Line Numbers)
**System Name:** Project SOLO (Solo Parent Portal & Information Management System)  
**Framework:** Angular (v17+ Standalone Architecture) + Ionic Framework 7  

---

## ⚡ 30-Second Presenter Elevator Pitch
> *"Good day! Our system, **Project SOLO**, is an Angular and Ionic web application designed to digitize application reviews, scheduling, and user management for Solo Parents under RA 11861.*  
> *We structured our business logic and local storage persistence in **SoloService**, implemented smooth client-side navigation using **lazy-loaded Angular routes**, and modularized our UI into **reusable components** such as `StatCardComponent` and `ApplicationCardComponent`.*  
> *We utilized all four **Angular bindings**—including **Two-Way Data Binding `[(ngModel)]`** for reactive modal forms—alongside modern **`@for` and `@if` control flow** for fast rendering. Finally, the interface is **fully responsive for mobile and desktop** using an adaptive split-pane layout and touch-optimized Ionic components."*

---

## 📊 Summary Checklist & Line Number Reference Table

| Demonstration Requirement | Exact File in Codebase | Line Numbers & Key Code |
| :--- | :--- | :--- |
| **1. Service** | `src/app/services/solo.service.ts` | **Lines 5–8**: `@Injectable({ providedIn: 'root' })`<br>**Lines 370–372**: `getSystemUsers()`<br>**Lines 378–381**: `addSystemUser()`<br>**Lines 403–415**: `toggleSystemUserStatus()` |
| **2. Routing / routerLink** | `src/app/app.routes.ts`<br>`src/app/app.component.html` | **Lines 3–21** (`app.routes.ts`): `loadComponent` lazy routes<br>**Lines 18–23** (`app.component.html`): `[routerLink]` & `routerLinkActive` |
| **3. Reusable Components** | `src/app/components/stat-card/stat-card.component.ts`<br>`src/app/pages/dashboard/dashboard.page.html` | **Lines 26–33** (`stat-card.component.ts`): `input.required()` Signals<br>**Lines 78–89** (`dashboard.page.html`): Reused 4x with `<app-stat-card>` |
| **4. Angular Binding** | `src/app/pages/dashboard/dashboard.page.html`<br>`src/app/pages/user-management/user-management.page.html`<br>`src/app/components/add-account-modal/` | **Interpolation**: `dashboard.page.html:27` `{{ userName() }}`<br>**Property**: `user-management.page.html:38` `[class.role-card--active]`<br>**Event**: `user-management.page.html:25` `(click)="openAddModal()"`<br>**Two-Way Form Binding**: `add-account-modal.component.html:38` `[(ngModel)]="fullName"` |
| **5. @for and @if** | `src/app/pages/user-management/user-management.page.html`<br>`src/app/pages/dashboard/dashboard.page.html` | **Lines 139–184** (`user-management.page.html`): `@for` with `track` & `@empty`<br>**Lines 127–183** (`dashboard.page.html`): `@if ... @else` tab switching |
| **6. UI/UX (Mobile)** | `src/app/app.component.html`<br>`src/app/pages/dashboard/dashboard.page.html` | **Lines 1–3** (`app.component.html`): `ion-split-pane` adaptive drawer<br>**Line 79** (`dashboard.page.html`): `ion-col` responsive breakpoints |

---

# 1. 🛠️ Service (Data & Functionality)

### Concept:
A **Service** provides data and business logic to the application so components don't have to manage raw data or duplicate logic.

### 📍 Where in Code:
[src/app/services/solo.service.ts](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/services/solo.service.ts)

```typescript
// Lines 5-8: Injectable Service Registration
5:  @Injectable({
6:    providedIn: 'root',
7:  })
8:  export class SoloService {

// Lines 370-372: Providing Data
370:   getSystemUsers(): SystemUser[] {
371:     return [...this.systemUsers];
372:   }

// Lines 378-381: Adding Data + LocalStorage Persistence
378:   addSystemUser(user: SystemUser): void {
379:     this.systemUsers = [user, ...this.systemUsers];
380:     this.saveSystemUsers();
381:   }

// Lines 403-415: Business Logic (Toggling Active/Inactive status)
403:   toggleSystemUserStatus(userId: number): SystemUser | null {
404:     let updatedUser: SystemUser | null = null;
405:     this.systemUsers = this.systemUsers.map(user => {
406:       if (user.id === userId) {
407:         const nextStatus: UserStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
408:         updatedUser = { ...user, status: nextStatus };
409:         return updatedUser;
410:       }
411:       return user;
412:     });
413:     this.saveSystemUsers();
414:     return updatedUser;
415:   }
```

> 🗣️ **What to say in presentation:**
> *"We created `SoloService` as our centralized data store. Lines 5–8 use `@Injectable({ providedIn: 'root' })` to make it accessible everywhere. In lines 378–381, `addSystemUser()` saves newly created users, and line 403 `toggleSystemUserStatus()` updates user statuses and saves them to `localStorage` so data persists across refreshes."*

---

# 2. 🧭 Routing / routerLink (Navigation)

### Concept:
**Routing** allows single-page navigation without reloading the browser. We use **lazy-loading** (`loadComponent`) so each page only loads when visited.

### 📍 Where in Code:
1. [src/app/app.routes.ts](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/app.routes.ts) *(Route Definitions)*
2. [src/app/app.component.html](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/app.component.html) *(Navigation Template)*

```typescript
// src/app/app.routes.ts (Lines 3-21)
3:  export const routes: Routes = [
4:    {
5:      path: '',
6:      redirectTo: 'dashboard',
7:      pathMatch: 'full',
8:    },
9:    {
10:     path: 'dashboard',
11:     loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
12:   },
18:   {
19:     path: 'user-management',
20:     loadComponent: () => import('./pages/user-management/user-management.page').then(m => m.UserManagementPage)
21:   },
22: ];
```

```html
<!-- src/app/app.component.html (Lines 18-23) -->
18: <ion-menu-toggle auto-hide="false" *ngFor="let p of appPages">
19:   <ion-item routerDirection="root" [routerLink]="[p.url]" lines="none" detail="false" routerLinkActive="selected">
20:     <ion-icon aria-hidden="true" slot="start" [name]="p.icon + '-outline'"></ion-icon>
21:     <ion-label>{{ p.title }}</ion-label>
22:   </ion-item>
23: </ion-menu-toggle>
```

> 🗣️ **What to say in presentation:**
> *"In `app.routes.ts` (lines 9–21), we configured routes with `loadComponent` for lazy loading to improve performance. In `app.component.html` (line 19), `[routerLink]` binds navigation to sidebar links, and `routerLinkActive='selected'` automatically highlights the currently active page."*

---

# 3. 🧩 Reusable Components

### Concept:
A **Reusable Component** is a self-contained UI element that accepts custom inputs and can be reused multiple times across the application.

### 📍 Where in Code:
1. Component: [src/app/components/stat-card/stat-card.component.ts](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/components/stat-card/stat-card.component.ts)
2. Reused in: [src/app/pages/dashboard/dashboard.page.html](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/pages/dashboard/dashboard.page.html)

```typescript
// src/app/components/stat-card/stat-card.component.ts (Lines 26-33)
26: export class StatCardComponent {
27:   readonly title = input.required<string>();
28:   readonly value = input.required<number>();
29:   readonly changeText = input<string>('');
30:   readonly icon = input<string>('stats-chart-outline');
31:   readonly iconColor = input<string>('primary');
32:   readonly badgeType = input<'positive' | 'warning' | 'info' | 'success'>('positive');
33: }
```

```html
<!-- src/app/pages/dashboard/dashboard.page.html (Lines 78-89: Reused 4 times) -->
78: @for (stat of stats(); track stat.id) {
79:   <ion-col size="12" size-sm="6" size-lg="3" class="stat-col">
80:     <app-stat-card
81:       [title]="stat.title"
82:       [value]="stat.value"
83:       [changeText]="stat.changeText"
84:       [icon]="stat.icon"
85:       [iconColor]="stat.iconColor"
86:       [badgeType]="stat.badgeType"
87:     ></app-stat-card>
88:   </ion-col>
89: }
```

> 🗣️ **What to say in presentation:**
> *"Instead of copying card HTML 4 times, we created `StatCardComponent`. In lines 27–32, it accepts dynamic input signals (`title`, `value`, `badgeType`). In `dashboard.page.html` (lines 80–87), we reuse `<app-stat-card>` to render all 4 metric cards dynamically."*

---

# 4. ⚡ Angular Binding (All 4 Types Demonstrated)

### Concept:
Angular Binding links data between TypeScript logic and the HTML view. Our implementation demonstrates **Interpolation**, **Property Binding**, **Event Binding**, and **Two-Way Form Binding (`[(ngModel)]`)**.

### 📍 Where in Code:

| Binding Type | Syntax | Exact Line of Code | Location |
| :--- | :--- | :--- | :--- |
| **1. Interpolation** | `{{ }}` | `27: <h1>{{ userName() }}</h1>`<br>`48: <ion-note>{{ totalUsersCount() }} users</ion-note>` | `dashboard.page.html:27`<br>`user-management.page.html:48` |
| **2. Property Binding** | `[property]="value"` | `38: [class.role-card--active]="activeRoleFilter() === 'ALL'"`<br>`204: [user]="selectedUser()"`<br>`205: [isOpen]="showViewModal()"` | `user-management.page.html:38`<br>`user-management.page.html:204-205` |
| **3. Event Binding** | `(event)="handler()"` | `25: <ion-button (click)="openAddModal()">`<br>`105: <ion-searchbar (ionInput)="onSearchChange($event)">`<br>`132: (selected)="handleApplicationSelection($event)"` | `user-management.page.html:25`<br>`user-management.page.html:105`<br>`dashboard.page.html:132` |
| **4. Two-Way Form Binding** | `[(ngModel)]="property"` | `38: [(ngModel)]="fullName"`<br>`55: [(ngModel)]="email"`<br>`72: [(ngModel)]="password"` | `add-account-modal.component.html:38, 55, 72` |

### Two-Way Form Binding Code Proof:
In [src/app/components/add-account-modal/add-account-modal.component.ts](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/components/add-account-modal/add-account-modal.component.ts#L3-L67):
```typescript
3:  import { FormsModule } from '@angular/forms';
...
42:   imports: [ CommonModule, FormsModule, ... ],
...
60:   // Form fields bound via [(ngModel)]
61:   fullName = '';
62:   email = '';
63:   password = '';
64:   phone = '';
65:   role: UserRole = 'SOLO PARENT';
66:   position = 'Solo Parent Applicant';
67:   barangay = '';
```

In [src/app/components/add-account-modal/add-account-modal.component.html](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/components/add-account-modal/add-account-modal.component.html#L33-L73):
```html
<!-- Full Name Input with Two-Way Binding [(ngModel)] -->
33: <div class="input-wrap" [class.input-wrap--error]="errors()['name']">
34:   <input
35:     class="form-input"
36:     type="text"
37:     name="fullName"
38:     placeholder="e.g. Maria Santos"
39:     [(ngModel)]="fullName"
40:   />
41: </div>

<!-- Email Address Input with Two-Way Binding [(ngModel)] -->
50: <input
51:   class="form-input"
52:   type="email"
53:   name="email"
54:   placeholder="e.g. maria@solo.com"
55:   [(ngModel)]="email"
56: />

<!-- Password Input with Two-Way Binding [(ngModel)] -->
68: <input
69:   class="form-input"
70:   [type]="showPassword() ? 'text' : 'password'"
71:   name="password"
72:   placeholder="Set account password (e.g. pass123)"
73:   [(ngModel)]="password"
74: />
```

> 🗣️ **What to say in presentation:**
> *"We demonstrate all 4 Angular bindings. For form binding, we imported `FormsModule` and used Angular's two-way data binding syntax `[(ngModel)]` (banana-in-a-box) in `AddAccountModalComponent` (lines 38, 55, 72). When the user types into the input, the component's TypeScript variables (`fullName`, `email`, `password`) automatically update in real time, and vice versa."*

---

# 5. 🔄 Control Flow: `@for` and `@if`

### Concept:
Angular 17+ native control flow replaces `*ngFor` and `*ngIf` with cleaner, faster `@for` and `@if` blocks with built-in empty state handling.

### 📍 Where in Code:
1. [src/app/pages/user-management/user-management.page.html](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/pages/user-management/user-management.page.html)
2. [src/app/pages/dashboard/dashboard.page.html](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/pages/dashboard/dashboard.page.html)

```html
<!-- user-management.page.html (Lines 139-184: @for loop with @empty fallback) -->
139: @for (user of filteredUsers(); track user.id) {
140:   <ion-item button (click)="openViewUserModal(user)" class="um-user-row" lines="full" detail="false">
141:     <ion-avatar slot="start" class="um-user-avatar">
142:       <ion-text class="um-avatar-char">{{ user.avatarChar }}</ion-text>
143:     </ion-avatar>
144:     <ion-label class="um-user-label">
145:       <ion-text class="um-user-name">{{ user.name }}</ion-text>
146:       <ion-note class="um-user-email">{{ user.email }}</ion-note>
147:     </ion-label>
148:   </ion-item>
177: } @empty {
178:   <ion-item lines="none" class="um-empty-state">
179:     <ion-label class="ion-text-center">
180:       <ion-icon name="people-outline" class="empty-icon"></ion-icon>
181:       <p>No users found matching your filters.</p>
182:     </ion-label>
183:   </ion-item>
184: }
```

```html
<!-- dashboard.page.html (Lines 127-143: @if / @else Conditional Tab Views) -->
127: @if (activeSegment() === 'applications') {
128:   <ion-list lines="full" class="applications-container-list">
129:     @for (app of applications(); track app.id) {
130:       <app-application-card [application]="app" (selected)="handleApplicationSelection($event)"></app-application-card>
131:     }
132:   </ion-list>
142: } @else {
143:   <ion-list lines="full" class="users-container-list">
144:     @for (admin of admins(); track admin.id) {
145:       <ion-item button (click)="handleUserSelection(admin)"> ... </ion-item>
146:     }
183: }
```

> 🗣️ **What to say in presentation:**
> *"In `user-management.page.html` (line 139), `@for (...; track user.id)` efficiently loops through users, and line 177 `@empty` automatically displays a message if no users match the filter. In `dashboard.page.html` (line 127), `@if ... @else` conditionally switches between the Applications tab and the System Users tab."*

---

# 6. 📱 UI/UX & Mobile Adaptation

### Concept:
The layout automatically adapts between smartphone screens and desktop monitors.

### 📍 Where in Code:
1. [src/app/app.component.html](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/app.component.html) *(Responsive Split-Pane)*
2. [src/app/pages/dashboard/dashboard.page.html](file:///c:/Users/Jorald/Documents/IT-WS07/projectsulo/src/app/pages/dashboard/dashboard.page.html) *(Responsive Grid Breakpoints)*

```html
<!-- src/app/app.component.html (Lines 1-3: Adaptive Split Pane) -->
1: <ion-app>
2:   <ion-split-pane contentId="main-content">
3:     <ion-menu contentId="main-content" type="overlay">
```

```html
<!-- src/app/pages/dashboard/dashboard.page.html (Line 79: Responsive Breakpoints) -->
79: <ion-col size="12" size-sm="6" size-lg="3" class="stat-col">
```

### Breakdown of Mobile Features:
1. **`ion-split-pane` (Line 2):**
   - On **Mobile screens**: The sidebar collapses into a hidden drawer accessible via the hamburger button.
   - On **Desktop screens**: The sidebar stays permanently locked on the left.
2. **Responsive Grid (Line 79):**
   - `size="12"` = **1 column** on smartphones.
   - `size-sm="6"` = **2 columns** on tablets.
   - `size-lg="3"` = **4 columns** on desktop screens.
3. **Touch Optimizations:**
   - Searchbar uses `[debounce]="300"` (`user-management.page.html:104`) to prevent mobile typing lag.
   - Touch-friendly segment buttons (`dashboard.page.html:100-114`).

> 🗣️ **What to say in presentation:**
> *"For UI/UX, we used Ionic's `ion-split-pane` in `app.component.html` (line 2), which collapses into a touch drawer on mobile and locks as a sidebar on desktop. In `dashboard.page.html` (line 79), `ion-col` uses responsive breakpoints (`size='12'`, `size-sm='6'`, `size-lg='3'`) so cards stack on mobile and spread out on desktop."*

---

## 🎯 Anticipated Panelist Questions & Winning Answers

#### Q1: *"Why did you use Two-Way Data Binding (`[(ngModel)]`) in the Add Account Modal?"*
> **Answer:** *"Because it creates immediate synchronization between our form inputs and the component's state. When the user types their name, email, or password, the backing variables in `AddAccountModalComponent` update instantly, making client-side validation and account creation simple and clean."*

#### Q2: *"Why did you use Angular Signals (`signal()` and `computed()`) in pages instead of normal variables?"*
> **Answer:** *"Signals provide fine-grained reactivity. When data changes in `SoloService`, only the exact components and computed counters (`totalUsersCount`, `filteredUsers`) that depend on that signal are recalculated, without triggering unnecessary full-app re-renders."*

#### Q3: *"Where is the data stored? Does it persist if I close the tab?"*
> **Answer:** *"Yes. `SoloService` serializes the records to the browser's `localStorage` via `saveSystemUsers()` and `loadSystemUsers()`. Any account created or status toggled remains saved across refreshes."*
