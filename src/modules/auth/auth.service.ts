/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly userService: UserService) { }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByEmail(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
