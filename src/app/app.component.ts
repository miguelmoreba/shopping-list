import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, NgForm } from '@angular/forms';
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
  statusMessage = 'Up to date :)';
  timeOutItems;
  justSaved = true;

  itemsArrayForm = this.fb.group({
    items: this.fb.array([])
  });

  ngOnInit(): void {
    this.populateForm();
    console.log(this.itemsArrayForm)
    this.itemsArrayForm.valueChanges
      .subscribe(() => {
        if (!this.itemsArrayForm.pristine){
          this.statusMessage = 'Waiting til you stop typing...'
          if (this.timeOutItems) {
            clearTimeout(this.timeOutItems);
          }
          this.timeOutItems = setTimeout(() => this.onClick(), 1000);
        }
        this.justSaved = false;
      })
  }

  onUpdateClick() {
    this.populateForm();
  }

  onClick() {
    this.statusMessage = 'Saving your changes...'
    this.isLoading = true;
    this.dataService.postItem(this.items.value.filter(value => value))
      .subscribe(
        () => {
          this.populateForm();
          this.statusMessage = 'Everything up to date :)'
          this._markFormPristine(this.itemsArrayForm);
        },
        error => {
          console.log(error);
          this.statusMessage = 'There was a problem saving your changes';
          this.isLoading = false;
        }
      )
  }

  onKeyDown(event, index) {
    if (this.items.at(index).value.length === 0 && event.key === 'Backspace') {
      event.preventDefault();
      <HTMLInputElement><unknown>document.getElementById((index - 1).toString()).focus();
      this.items.removeAt(index);
      return;
    }
    else if (event.key === 'Enter') {
      this.items.insert(index + 1, new FormControl(''));
      setTimeout(() => {
        <HTMLInputElement><unknown>document.getElementById((index + 1).toString()).focus();
      }, 0)
      return;
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

  private _markFormPristine(form: FormGroup | NgForm): void {
    Object.keys(form.controls).forEach(control => {
        form.controls[control].markAsPristine();
    });
}
}
