import { Component, OnDestroy } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CurrencyPipe, DecimalPipe, NgIf, NgStyle } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GetDataService } from '../../services/get-data.service';
import { Subscription, forkJoin, map, pipe, tap } from 'rxjs';
import { SharedDataService } from '../../services/shared-data.service';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgIf, LoaderComponent, MatTableModule, CurrencyPipe, NgIf, NgStyle, DecimalPipe, MatSortModule],
  providers: [GetDataService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnDestroy {
  isLoader = false;
  displayedColumns: string[] = ['id', 'name', 'price', '24h', '7d'];
  datasource = new MatTableDataSource();
  subscription: Subscription = new Subscription();
  constructor(private getDataService: GetDataService, private sharedDataService: SharedDataService) {
  }

  ngOnInit() {
    this.isLoader = true
    const item1 = this.getDataService.getAllCryptpCurrencyData();
    const item2 = this.getDataService.getLiveRates();

    this.subscription.add(forkJoin([item1, item2]).pipe(map(
      (combinedData: any) => {
        const cryptoArray = Object.values(combinedData[0].crypto);
        const ratesObj = combinedData[1].rates;
        const transformedCryptoArray = cryptoArray.map((coin: any) => {
          const symbol = coin.symbol;
          const rate = ratesObj[symbol];
          const last24hrChange = this.getRandomNumber(0, 5);
          const last7dChange = this.getRandomNumber(0, 8);
          return { ...coin, price: rate, last24hrChange: last24hrChange, last7dChange: last7dChange, };
        });
        return transformedCryptoArray;
      }))
      .subscribe((resultantData: any) => {
        this.datasource = new MatTableDataSource(resultantData)
        this.sharedDataService.emitdata(resultantData);
        this.isLoader = false;
      }))
  }
  public getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

