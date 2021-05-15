import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-categories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.scss']
})
export class CategoriesManagerComponent implements OnInit {
  private categroyId: string;
  public upadteFlag: boolean;

  public categoryName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.upadteFlag = false;
    this.categoryName = '';

    // checa se existe algum id selecionado e trata o form como um update
    this.activatedRoute.params.subscribe(params => {
      if (!!params.id) {
        this.upadteFlag = true;
        this.categroyId = params.id;
      }
    });
  }

  finishForm(e: Event) {
    e.preventDefault();

    let request$: Observable<Category> = null;

    if (!this.upadteFlag) {
      request$ = this.categoryService.create({ name: this.categoryName });
    } else {
      // TODO: aplicar o update de categoria, usar request$
      console.log(this.categroyId);
    }

    // faz o request e manda para a tela de categorias
    request$.subscribe(_ => this.router.navigate(['/admin/categories']));
  }
}
