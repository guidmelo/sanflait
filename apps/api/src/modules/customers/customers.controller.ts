import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CrmStatus } from '@prisma/client';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customers: CustomersService) {}

  @Get()
  list(
    @Query('status') status?: CrmStatus,
    @Query('vendorId') vendorId?: string,
    @Query('neighborhood') neighborhood?: string,
  ) {
    return this.customers.list({ status, vendorId, neighborhood });
  }

  @Get(':id')
  byId(@Param('id') id: string) { return this.customers.byId(id); }

  @Post()
  create(@Body() body: any) { return this.customers.create(body); }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: CrmStatus,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.customers.updateStatus(id, status, user.sub);
  }
}
