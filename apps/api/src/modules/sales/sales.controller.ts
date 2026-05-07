import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SaleStatus } from '@prisma/client';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private sales: SalesService) {}

  @Get()
  list(
    @Query('vendorId') vendorId?: string,
    @Query('status') status?: SaleStatus,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.sales.list({ vendorId, status, from, to });
  }

  @Post()
  create(@Body() body: any) { return this.sales.create(body); }
}
