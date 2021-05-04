import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../../models/lead.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private url = `${environment.BASE_BACKEND_URL}/lead`;
  constructor(
      private api: HttpClient,
  ) { }

  public create(lead: Lead) {
      return this.api.post(this.url, lead);
  }
}
