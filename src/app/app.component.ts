import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private readonly dataService: DataService){}

  title = 'shopping-list';

  items: any[];
  newItem = new FormControl('');

  ngOnInit(): void {
    this.dataService.getItems()
      .subscribe(response => this.items = response);
  }

  onClick() {
    console.log('heeeeeey')
    this.dataService.postItem({items: ['cheese']})
      .subscribe(() => console.log('done'));
  }
}
