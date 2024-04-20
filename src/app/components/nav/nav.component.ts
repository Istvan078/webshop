import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  numberOfProds: number = 0

 constructor(private store: Store<fromApp.AppState>){}
  ngOnInit(): void {
    this.store.select('products').subscribe((state) => {
      this.numberOfProds = state.basket.length
    })
  }
}
