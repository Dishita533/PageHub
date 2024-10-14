
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-add',
  standalone: true,
  imports:  [MatSnackBarModule,MatCommonModule,MatButtonModule,MatIconButton,
    MatCommonModule,FormsModule,
    ReactiveFormsModule,
    MatIconAnchor,MatIconModule,MatSelectModule,MatRadioModule,MatCardModule,CommonModule,MatFormFieldModule,MatCheckboxModule
,MatListModule,MatInputModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  bookForm: FormGroup;
  categories: string[] = [
    'Romance',
'Historical Fiction',
'Thriller & Suspense',
'Horror',
'Mystery',
'Action & Adventure',
'Science Fiction',
'Fantasy','Cookbooks',
'Religion & Spirituality',
'Philosophy',
'Art & Photography'
  ];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      bookType: ['', Validators.required],
      categories: [[]],
      image: ['']
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      console.log('Book added:', this.bookForm.value);
      if (this.selectedFile) {
        console.log('Selected file:', this.selectedFile);
        // Here you would typically upload the file to a server
      }
      this.snackBar.open('Book added successfully!', 'Close', {
        duration: 3000,
      });
      this.bookForm.reset();
      this.selectedFile = null;
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }
}
