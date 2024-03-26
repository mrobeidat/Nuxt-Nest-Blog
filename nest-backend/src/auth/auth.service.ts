import { Injectable } from '@nestjs/common';

export interface JWTTokens {
    accessToken: string
    refreshToken: string
}

@Injectable()
export class AuthService {

}
