import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  // Generic method to open a snackbar
  open(
    message: string,
    action = '',
    duration = 3000,
    config?: MatSnackBarConfig,
  ) {
    return this.snackBar.open(message, action, {
      duration: duration,
      ...config,
    });
  }

  // Method for success messages
  showSuccess(message: string) {
    this.open(message, 'Close', 3000, {
      panelClass: ['snackbar-success'],
    });
  }

  // Method for error messages
  showError(message: string) {
    this.open(message, 'Close', 5000, {
      panelClass: ['snackbar-error'],
    });
  }

  // Method for general information messages
  showInfo(message: string) {
    this.open(message, 'Close', 3000, {
      panelClass: ['snackbar-info'],
    });
  }
}
