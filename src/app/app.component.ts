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

  onUpdateClick(){
    this.populateForm();
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

  onKeydownEnter(event, index){
    this.items.insert(index + 1, new FormControl(''));
    setTimeout(()=> {
      <HTMLInputElement><unknown>document.getElementById((index + 1).toString()).focus();
    }, 0)
  }

  onKeyDown(event, index){
    console.log(event)
    if(this.items.at(index).value.length === 0 && event.key === 'Backspace'){
      event.preventDefault();
      <HTMLInputElement><unknown>document.getElementById((index - 1).toString()).focus();
      this.items.removeAt(index);
    }
    
  }

  get items(): FormArray {
    return this.itemsArrayForm.controls.items as FormArray;
  }

  populateForm() {
    this.isLoading = true;
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
