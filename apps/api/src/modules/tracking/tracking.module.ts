import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';

@Module({
  providers: [TrackingService],
  controllers: [TrackingController],
  exports: [TrackingService],
})
export class TrackingModule {}
