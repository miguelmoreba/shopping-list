import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    this.getData()
  }

  onClick() {
    this.dataService.postItem([...this.items].concat(this.newItem.value))
      .subscribe((response) => {
        console.log('done', response);
        this.getData();
      });
  }         

  getData() {
    this.dataService.getItems()
      .subscribe(response => this.items = response);
  }
}
