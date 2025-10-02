import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserAuthService } from "../services/user-auth";
import { UserService } from "../services/user";
import { firstValueFrom } from "rxjs";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
    const _userService = inject(UserService);
    const _userAuthService = inject(UserAuthService);
    const _router = inject(Router);
    
    if(!_userAuthService.getUserToken()) {
        return true;
    }

    try {
        await firstValueFrom(_userService.validateUser());
        return _router.navigate(['/products']);
    } catch (error) {
        return true;
    }
}