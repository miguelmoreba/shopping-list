import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly dataService: DataService){}

  title = 'shopping-list';

  items = ['cheese', 'carrots', 'ham']

  onClick() {
    console.log('heeeeeey')
    this.dataService.postItem({items: ['cheese']})
      .subscribe(() => console.log('done'));
  }
}
