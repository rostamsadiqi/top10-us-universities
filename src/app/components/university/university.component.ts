import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, debounce, debounceTime, EMPTY, tap } from 'rxjs';
import { University } from 'src/app/interfaces/university';
import { UniversitiesService } from 'src/app/services/universities.service';
import { Appconstants } from 'src/app/shared/constants';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
})
export class UniversityComponent implements OnInit {
  readonly pageCount: number = Appconstants.PAGE_COUNT;
  readonly maxCount: number = Appconstants.MAX_COUNT;

  initalFilter = {
    country: 'United States',
    name: '',
    page: 1,
    pageCount: this.pageCount,
  };

  form: FormGroup;

  universityList: University[] = [];
  p: number = 1;

  constructor(private fb: FormBuilder, private uService: UniversitiesService) {}

  ngOnInit(): void {
    this.getUniversities();
    this.createForm();

    this.form
      .get('name')
      ?.valueChanges.pipe(
        debounceTime(200),
        tap((v) => {
          this.initalFilter.page = 1;
          this.initalFilter.name = v;
        }),
        tap(() => this.getUniversities())
      )
      .subscribe();
  }
  createForm() {
    this.form = this.fb.group({
      name: [null],
    });
  }
  getUniversities() {
    this.uService
      .getData(this.initalFilter)
      .pipe(
        tap((res) => (this.universityList = res)),
        catchError((error) => (console.log(error), EMPTY))
      )
      .subscribe();
  }

  onTableDataChange(event: any) {
    this.initalFilter.page = event;
    this.getUniversities();
  }

  getCountNo(index: number): number {
    return (this.initalFilter.page - 1) * 10 + 1 + index;
  }
}
