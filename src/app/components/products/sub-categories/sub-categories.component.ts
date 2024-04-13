import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent implements OnInit{
  categories: any[] =[]
  subcategories: any = {}
  constructor(private config: ConfigService) {}
  ngOnInit(): void {
    this.categories = this.config.getCategories()
    this.subcategories = this.config.getSubCategories()
  }

  toggle() {
    document.querySelector('.subCategories')?.classList.toggle('d-none')
  }
}
