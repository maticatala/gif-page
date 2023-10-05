import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  reload( tag: string ):void {
    this.gifsService.addTag(tag);
  }

  remove(tag: string): void {
    debugger;
    this.gifsService.removeTag(tag);
  }

}
