import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.GERENTE)
@Controller('analytics')
export class AnalyticsController {
  constructor(private analytics: AnalyticsService) {}

  @Get('dashboard')   dashboard() { return this.analytics.dashboard(); }
  @Get('funnel')      funnel()    { return this.analytics.funnel(); }
  @Get('lead-sources') leads()    { return this.analytics.leadSources(); }
  @Get('monthly-revenue')
  monthly(@Query('year') year?: string) {
    return this.analytics.monthlyRevenue(year ? parseInt(year, 10) : undefined);
  }
}
