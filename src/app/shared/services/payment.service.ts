import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Payment } from 'src/app/models/payment.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private api: HttpClient
  ) { }

  pay(payment: Payment): Observable<any> {
    // return this.api.post(environment.PAYMENT_URL, payment)
    return of({
      id_cobranca_gateway: [
          "chr_FAA2F5ADF8402A1296E4D776241C94EC"
      ],
      vencimento: "2021-07-06",
      status: 1,
      gateway: "Juno",
      proxima_url: "https://pay-sandbox.juno.com.br/charge/boleto.pdf?token=1332293:m:004658356cc949085475de05c8dc8e9d4cef5e6b3e37dade4b8ff5a17381ee85",
      cobranca_paga: false
    })
  }
}
