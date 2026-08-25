import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastConfig {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly currentToast = signal<ToastConfig | null>(null);
  private timer: any = null;

  show(message: string, type: ToastType = 'success', title?: string, duration: number = 3500): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const toast: ToastConfig = {
      id: Date.now().toString(),
      message,
      title: title || this.getDefaultTitle(type),
      type,
      duration
    };

    this.currentToast.set(toast);

    if (duration > 0) {
      this.timer = setTimeout(() => {
        this.dismiss();
      }, duration);
    }
  }

  success(message: string, title?: string): void {
    this.show(message, 'success', title || 'Success');
  }

  error(message: string, title?: string): void {
    this.show(message, 'error', title || 'Error');
  }

  info(message: string, title?: string): void {
    this.show(message, 'info', title || 'Information');
  }

  warning(message: string, title?: string): void {
    this.show(message, 'warning', title || 'Warning');
  }

  dismiss(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.currentToast.set(null);
  }

  private getDefaultTitle(type: ToastType): string {
    switch (type) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': default: return 'Information';
    }
  }
}
