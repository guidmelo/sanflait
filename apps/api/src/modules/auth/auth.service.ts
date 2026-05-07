import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.active) throw new UnauthorizedException('Credenciais inválidas');
    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      {
        secret: this.config.get('JWT_SECRET') ?? 'dev-secret',
        expiresIn: '15m',
      },
    );
    const refreshToken = uuid();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30d
    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        initials: user.initials,
        avatarColor: user.avatarColor,
      },
    };
  }

  async refresh(refreshToken: string) {
    const found = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
    if (!found || found.revokedAt || found.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token inválido');
    }
    const accessToken = await this.jwt.signAsync(
      { sub: found.user.id, email: found.user.email, role: found.user.role },
      {
        secret: this.config.get('JWT_SECRET') ?? 'dev-secret',
        expiresIn: '15m',
      },
    );
    return { accessToken };
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revokedAt: new Date() },
    });
    return { ok: true };
  }
}
