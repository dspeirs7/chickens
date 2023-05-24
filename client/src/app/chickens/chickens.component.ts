import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Chicken } from '../chicken';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import {
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { ChickenService } from '../chicken.service';

interface DialogData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-chickens',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
  ],
  templateUrl: './chickens.component.html',
  styleUrls: ['./chickens.component.scss'],
})
export class ChickensComponent {
  displayedColumns: string[] = ['name', 'type', 'delete'];
  dataSource: ChickenDatasSource;

  constructor(
    private chickenService: ChickenService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new ChickenDatasSource(this.chickenService);
  }

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
          this.dataSource = new ChickenDatasSource(this.chickenService);
        });
      }
    });
  }
}

class ChickenDatasSource extends DataSource<Chicken> {
  constructor(private chickenService: ChickenService) {
    super();
  }

  override connect(): Observable<readonly Chicken[]> {
    return this.chickenService.getChickens();
  }

  override disconnect(): void {}
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
