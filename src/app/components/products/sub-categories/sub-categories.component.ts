import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss',
})
export class SubCategoriesComponent implements OnInit {
  categories: any[] = [];
  subcategories: any = {};
  catKey: string = '';
  icons: any[] = [];
  constructor(private config: ConfigService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.icons = this.config.getIcons();
    this.categories = this.config.getCategories();
    this.subcategories = this.config.getSubCategories();
    this.route.params.subscribe((cat: any) => {
      if (!cat.cat) return;
      const parArray = cat.cat.split('-');
      this.catKey = parArray[0];
    });
  }

  toggle(category: any, i: number) {
    if (category === this.subcategories[category]?.key) {
      const subcatAnchor = document.querySelectorAll('.subCategories');
      const categories = document.querySelectorAll('.category-anchor');
      subcatAnchor[i as number]?.classList?.toggle('d-none');
      categories[i].classList.toggle('selected');
    }
  }
}
