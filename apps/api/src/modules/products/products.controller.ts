import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  list(@Query('collection') collection?: string, @Query('category') category?: string) {
    return this.products.list({ collection, category });
  }

  @Get(':slug')
  bySlug(@Param('slug') slug: string) {
    return this.products.bySlug(slug);
  }
}
