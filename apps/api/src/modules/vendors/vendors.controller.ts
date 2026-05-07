import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('vendors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vendors')
export class VendorsController {
  constructor(private vendors: VendorsService) {}

  @Get() list() { return this.vendors.list(); }
  @Get('ranking') ranking() { return this.vendors.ranking(); }
  @Get(':slug') bySlug(@Param('slug') slug: string) { return this.vendors.bySlug(slug); }
}
