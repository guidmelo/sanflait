import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoresService } from './stores.service';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private stores: StoresService) {}

  @Get()
  list() { return this.stores.list(); }
}
