import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar: </h5>
    <input (keyup.enter)="searchTag()" #txtTagInput type="text" class="form-control" placeholder="Buscar gifs...">
  `
})
export class SearchBoxComponent {
  constructor( private gifsService: GifsService) {}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.addTag(newTag);

    this.tagInput.nativeElement.value = '';
  };

}
