import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SalesModule } from './modules/sales/sales.module';
import { StoresModule } from './modules/stores/stores.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { CrmModule } from './modules/crm/crm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    VendorsModule,
    ProductsModule,
    CustomersModule,
    SalesModule,
    StoresModule,
    TrackingModule,
    AnalyticsModule,
    CrmModule,
  ],
})
export class AppModule {}
