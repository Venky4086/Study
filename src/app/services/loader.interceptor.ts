import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';

import {LoaderService} from './loader.service';
import { finalize } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor  {

  constructor(private loader: LoaderService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loader.show()
    return next.handle(req).pipe(
      finalize(() => this.loader.hide())
    );

  }
}