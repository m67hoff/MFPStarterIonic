import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/map';

@Injectable()
export class JsonTestProvider {

  constructor() {
    console.log('--> JsonTestProvider constructor')
  }

  // WLResourceRequest as Promise 
  load_Promise() {
    console.log('--> JsonTestProvider called')

    // https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html
    const resourceRequest = new WLResourceRequest("/adapters/MFPStarterIonicAdapter/getJsonTest", WLResourceRequest.GET);

    return new Promise((resolve, reject) => {
      resourceRequest.send() //https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html#send
        .then(response => {
          console.log('--> JsonTestProvider resourceRequest:  Success ', response);
          resolve(response)
        }, error => {
          console.log('--> JsonTestProvider resourceRequest:  ERROR HTTP status', error.status);
          console.log('--> JsonTestProvider resourceRequest:  ERROR ', error.responseText);
          reject(error)
        })

    })
  }

  // WLResourceRequest as Observable 
  load_rxjs(): Observable<any> {
    console.log('--> JsonTestProvider called')

    // https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html
    const resourceRequest = new WLResourceRequest("/adapters/MFPStarterIonicAdapter/getJsonTest", WLResourceRequest.GET);

    let responseStream = Observable.fromPromise(resourceRequest.send() as any);

    /*    
    let responseStream = Observable.create(observer => { 
    
          resourceRequest.send()   //https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html#send
            .then(response => {
              console.log('--> JsonTestProvider resourceRequest:  Success ', response);
              observer.next(response)
            }, error => {
              console.log('--> JsonTestProvider resourceRequest:  ERROR HTTP status', error.status);
              console.log('--> JsonTestProvider resourceRequest:  ERROR ', error.responseText);
              observer.error(error)
            })
    
        })
    */

    return responseStream  // .map(response => response.responseJSON)
  }

}