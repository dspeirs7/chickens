import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Chicken } from '../chicken';
import { EnvironmentPipe } from '../environment.pipe';
import { ChickenService } from '../chicken.service';

@Component({
  selector: 'app-chicken-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    EnvironmentPipe,
  ],
  templateUrl: './chicken-card.component.html',
  styleUrls: ['./chicken-card.component.scss'],
})
export class ChickenCardComponent {
  @Input() chicken: Chicken;
  @Input() showActions: boolean = false;
  @Output() onDelete = new EventEmitter<string>();

  constructor(
    private chickenService: ChickenService,
    private matDialog: MatDialog
  ) {}

  deleteChicken(chicken: Chicken) {
    const dialogRef = this.matDialog.open(DeleteChickenDialog, {
      data: {
        name: chicken.name,
        id: chicken.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chickenService.deleteChicken(chicken.id).subscribe(() => {
          this.onDelete.emit(chicken.id);
        });
      }
    });
  }
}

interface DialogData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-delete-chicken-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>
      Are you sure you want to delete {{ data.name }}?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Delete
      </button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteChickenDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
