import { Inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// Define the guard function
export const authGuard: CanActivateFn = (route, state) => {
  const platformId = Inject(PLATFORM_ID); // Inject the platform ID to check if we're in the browser
  const router = Inject(Router); // Inject the router

  // Only access sessionStorage if running in the browser
  if (isPlatformBrowser(platformId)) {
    if (sessionStorage.getItem('email')) {
      return true;
    } else {
      return router.navigate(['login']);
    }

  }
};
