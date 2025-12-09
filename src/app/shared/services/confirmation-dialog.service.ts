import { CommonModule } from '@angular/common';
import { Component, Inject, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">
        <mat-icon class="warning-icon">warning</mat-icon>
        Confirmar Exclusão
      </h2>
      <mat-dialog-content>
        <p class="dialog-message">
          Tem certeza que deseja excluir o produto 
          <strong>"{{ data.product.title }}"</strong>?
        </p>
        <p class="dialog-warning">Esta ação não pode ser desfeita.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onNo()" class="cancel-button">
          Cancelar
        </button>
        <button mat-raised-button color="warn" (click)="onYes()" class="delete-button">
          <mat-icon>delete</mat-icon>
          Excluir
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        min-width: 400px;
      }

      .dialog-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0;
        padding: 20px 24px;
        font-size: 20px;
        font-weight: 500;
      }

      .warning-icon {
        color: #ff9800;
        font-size: 28px;
        height: 28px;
        width: 28px;
      }

      mat-dialog-content {
        padding: 0 24px 20px;
      }

      .dialog-message {
        font-size: 16px;
        line-height: 1.5;
        margin: 0 0 12px 0;
        color: rgba(0, 0, 0, 0.87);
      }

      .dialog-warning {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        margin: 0;
        font-style: italic;
      }

      mat-dialog-actions {
        padding: 16px 24px;
        gap: 12px;
      }

      .cancel-button {
        min-width: 100px;
      }

      .delete-button {
        min-width: 120px;
        display: inline-flex;
        align-items: center;
        gap: 4px;

        mat-icon {
          font-size: 18px;
          height: 18px;
          width: 18px;
        }
      }
    `,
  ],
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Product }) {}
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog);
  
  constructor() { }

  openDialog(product: Product) {
    return this.matDialog.open(ConfirmationDialogComponent, {
      data: { product },
    });
  }
}
