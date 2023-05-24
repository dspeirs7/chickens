import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { Observable, switchMap } from 'rxjs';
import { Chicken, Vaccination } from '../chicken';
import { ChickenService } from '../chicken.service';

interface VaccinationForm {
  name: FormControl<string>;
  dateGiven: FormControl<string>;
}

@Component({
  selector: 'app-chicken',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './chicken.component.html',
  styleUrls: ['./chicken.component.scss'],
})
export class ChickenComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'dateGiven', 'delete'];
  chicken$: Observable<Chicken>;
  vaccinationsForm: FormGroup;
  maxDate = new Date();

  constructor(
    private chickenService: ChickenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chicken$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const chickenId = params.get('chickenId');

        return this.chickenService.getChicken(chickenId || '');
      })
    );

    this.vaccinationsForm = new FormGroup({
      vaccinations: new FormArray([]),
    });
  }

  get vaccinations() {
    return this.vaccinationsForm.get('vaccinations') as FormArray;
  }

  addVaccination() {
    this.vaccinations.push(
      new FormGroup<VaccinationForm>({
        name: new FormControl(),
        dateGiven: new FormControl(),
      })
    );
  }

  removeVaccination(index: number) {
    this.vaccinations.removeAt(index);
  }

  deleteVaccination(chicken: Chicken, vaccinationToDelete: Vaccination) {
    this.chickenService
      .updateChicken({
        ...chicken,
        vaccinations: chicken.vaccinations.filter(
          (vaccination) => vaccination !== vaccinationToDelete
        ),
      })
      .subscribe(() => {
        this.chicken$ = this.chickenService.getChicken(chicken.id);
      });
  }

  updateChicken(chicken: Chicken) {
    this.chickenService
      .updateChicken({
        ...chicken,
        vaccinations: [...chicken.vaccinations, ...this.vaccinations.value],
      })
      .subscribe(() => {
        this.chicken$ = this.chickenService.getChicken(chicken.id);
        this.vaccinations.clear();
      });
  }

  getDataSource(vaccinations: Vaccination[]) {
    const dataSource = new MatTableDataSource(vaccinations);
    dataSource.sort = this.sort;

    return dataSource;
  }
}
