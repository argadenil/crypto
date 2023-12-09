import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { SharedDataService } from '../../services/shared-data.service';
import { GetDataService } from '../../services/get-data.service';
import { Subscription, debounce, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { CryptoDetails } from '../../interfaces/crypto';
const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, NgIf, LoaderComponent, ReactiveFormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isLoader: boolean = false;
  currencyConveterForm!: FormGroup;
  currencyList!: CryptoDetails[];
  subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService, private getDataService: GetDataService) { }


  convertCurrency() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    this.isLoader = true;
    this.getDataForConversion();
    this.currencyConveterForm = this.fb.group({
      amount: ['', Validators.required],
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
    })
  }
  getDataForConversion() {
    this.subscription.add(this.sharedDataService.data$.subscribe((resultantArray: any) => {
      if (!resultantArray) {
        this.getDataService.getAllCryptpCurrencyData().subscribe((data: any) => {
          let cryptoArray: any = Object.values(data.crypto);
          this.currencyList = cryptoArray;
          this.isLoader = false;
        })
      }
      else {
        this.currencyList = resultantArray;
        this.isLoader = false;
      }
    }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

