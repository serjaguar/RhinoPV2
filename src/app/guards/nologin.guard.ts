import { Injectable } from '@angular/core';

import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NEXT } from '@angular/core/src/render3/interfaces/view';
import { promise } from 'protractor';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase';
import { map } from "rxjs/operators";
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';
import { Route } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements  CanActivate{
  constructor(private AFauth : AngularFireAuth,
    private router : Router){}
  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.AFauth.authState.pipe(map(auth => {
      
      if (isNullOrUndefined(auth)){        
        return true;
      }else{
        this.router.navigate(['/home']);
        return false;
      }
      }));
    }
}
