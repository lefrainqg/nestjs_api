import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { constants } from 'crypto'
import { Observable } from 'rxjs'
import * as https from "https"

@Injectable()
export class HttpsCustomService {

   constructor(private readonly http: HttpService) { }

   post<T = any>(url: string, data: any): Observable<AxiosResponse<T>> {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false, secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT })
      return this.http.post<T>(url, data, { httpsAgent })
   }

   postWithBasicAuth<T = any>(url: string, data: any, auth: any): Observable<AxiosResponse<T>> {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false, secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT })
      return this.http.post<T>(url, data, { httpsAgent, auth })
   }

   postWithHeaders<T = any>(url: string, data: any, token: string): Observable<AxiosResponse<T>> {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false, secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT })
      const options = { httpsAgent, headers: { Authorization: `Bearer ${token}` } }
      return this.http.post<T>(url, data, options)
   }

   get<T = any>(url: string): Observable<AxiosResponse<T>> {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false, secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT })
      return this.http.get<T>(url, { httpsAgent })
   }

   getWithHeaders<T = any>(url: string, token: string): Observable<AxiosResponse<T>> {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false, secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT })
      const options = { httpsAgent, headers: { Authorization: `Bearer ${token}` } }
      return this.http.get<T>(url, options)
   }

}
