import { Module } from '@nestjs/common';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';

@Module({
  providers: [CrmService],
  controllers: [CrmController],
  exports: [CrmService],
})
export class CrmModule {}
