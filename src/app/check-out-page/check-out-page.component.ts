import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Food } from '../data/food';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.css']
})
export class CheckOutPageComponent implements OnInit{
  a =true;
  b= false;
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private orderService: OrderService) {}

  orderItems = { items: [] as Food[] };

  total = 0;
  ngOnInit(): void {
    this.orderService.getFoodList().subscribe((foodItemList) => {
      this.orderItems = foodItemList.reduce(
        (acc, foodItem) => {
          let id = foodItem.id;
          let filteredFoodItem = acc.items.filter((foodItem) => {
            if (id == foodItem.id) {
              return true;
            }
            return false;
          });

          if (filteredFoodItem.length > 0) {
            acc.items.forEach((foodItem) => {
              if (foodItem.id == id) {
                if (foodItem.quantity) {
                  foodItem.quantity++;
                }
              }
            });
          } else {
            foodItem.quantity = 1;
            acc.items.push(foodItem);
          }
          this.total = this.total + foodItem.price;
          return acc;
        },
        { items: [] as Food[] }
      );
    });
  }

  multiply(a: number, b: number){
    return a*b;
  }



}
