import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class userGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   const token = localStorage.getItem('jwt');
    
    const loginRoute = '/login';
    const registerRoute = '/register'
    if ((state.url !== loginRoute &&  state.url !== registerRoute) && token === null ) {
      this.router.navigate(['/login']);
      return false;
    } else if ((state.url === loginRoute ||  state.url === registerRoute ) && token !== null) {
      this.router.navigate(['/user'])
      return false
    }
    
    return true;
  }
};

