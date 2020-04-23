import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Color } from './models/Color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  colorSearchTextInput = new FormControl()

  searchColors$ = new BehaviorSubject<string>('')

  colors$: Observable<string[]> = this.searchColors$.pipe(
    switchMap(searchColorText => {
      return this.httpClient.get<Color[]>('http://localhost:4250/color?name_like=' + searchColorText)
    }),
    map((colors: Color[]) => colors.map(color => color.name)),
  );

  constructor(private httpClient: HttpClient) {
  }

  doColorSearch() {
    this.searchColors$.next(this.colorSearchTextInput.value);
  }
}
