import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserAuthService } from "../services/user-auth";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const _userAuthService = inject(UserAuthService);

    if(_userAuthService.getUserToken()) {
        const newReq = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${_userAuthService.getUserToken()}`)
        });

        return next(newReq);
    }

    return next(req);
}