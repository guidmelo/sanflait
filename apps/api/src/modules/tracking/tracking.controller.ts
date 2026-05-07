import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';

@ApiTags('tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private tracking: TrackingService) {}

  @Post('sessions')
  upsertSession(@Body() body: any) {
    return this.tracking.upsertSession(body);
  }

  @Post('events')
  logEvent(@Body() body: any) {
    return this.tracking.logEvent(body);
  }
}
