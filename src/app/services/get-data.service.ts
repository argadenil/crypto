import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {

  constructor(private http: HttpClient) { }
  public getAllCryptpCurrencyData() {
    return this.http.get('http://api.coinlayer.com/list?access_key=82fed3574b39df27730e140c553730a4')
  }

  public getLiveRates() {
    return this.http.get('http://api.coinlayer.com/live?access_key=82fed3574b39df27730e140c553730a4')
  }

  public convertCrypto(from: string, to: string, amount: number) {
    return this.http.get(`http://api.coinlayer.com/convert?access_key=82fed3574b39df27730e140c553730a4&from=${from}&to=${to}&amount=${amount}`)
  }

}
