import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CrmService } from './crm.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';

@ApiTags('crm')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('crm')
export class CrmController {
  constructor(private crm: CrmService) {}

  @Get('pipeline') pipeline() { return this.crm.pipeline(); }

  @Get(':customerId/logs')
  logs(@Param('customerId') customerId: string) {
    return this.crm.logs(customerId);
  }

  @Post(':customerId/notes')
  addNote(
    @Param('customerId') customerId: string,
    @Body('description') description: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.crm.addNote(customerId, user.sub, description);
  }
}
