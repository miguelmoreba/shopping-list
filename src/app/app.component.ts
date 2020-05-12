import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly dataService: DataService,
    private readonly fb: FormBuilder
  ) { }

  title = 'shopping-list';
  isLoading = false;

  itemsArrayForm = this.fb.group({
    items: this.fb.array([])
  });

  ngOnInit(): void {
    this.populateForm()
  }

  onClick() {
    this.isLoading = true;
    this.dataService.postItem(this.items.value.filter(value => value))
      .subscribe(
        () => this.populateForm(),
        error => {
          console.log(error);
          this.isLoading = false;
        }
      )
  }

  onKeydown(event, index){
    this.items.insert(index + 1, new FormControl(''))
  }

  get items(): FormArray {
    return this.itemsArrayForm.controls.items as FormArray;
  }

  populateForm() {
    this.dataService.getItems()
      .subscribe(response => {
        this.items.clear()
        response.forEach(element => {
          this.items.push(new FormControl(element));
        });
        this.items.push(new FormControl(''))
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      })
  }
}
