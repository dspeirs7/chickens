import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ChickenService } from '../chicken.service';

interface AddChickenForm {
  name: FormControl<string>;
  description: FormControl<string>;
  type: FormControl<number>;
}

@Component({
  selector: 'app-add-chicken',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-chicken.component.html',
  styleUrls: ['./add-chicken.component.scss'],
})
export class AddChickenComponent implements OnInit {
  addChickenForm: FormGroup;

  constructor(private chickenService: ChickenService, private router: Router) {}

  ngOnInit(): void {
    this.addChickenForm = new FormGroup<AddChickenForm>({
      name: new FormControl<string>('', { nonNullable: true }),
      description: new FormControl(),
      type: new FormControl<number>(0, {
        nonNullable: true,
        validators: Validators.min(1),
      }),
    });
  }

  addChicken() {
    this.chickenService.addChicken(this.addChickenForm.value).subscribe(() => {
      this.router.navigate(['/chickens']);
    });
  }
}
