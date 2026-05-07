import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.GERENTE)
  list() { return this.users.list(); }

  @Get(':id')
  @Roles(Role.ADMIN, Role.GERENTE)
  byId(@Param('id') id: string) { return this.users.byId(id); }
}
