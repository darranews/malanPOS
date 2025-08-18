import { Module } from "@nestjs/common";
import { ProductsService } from "@/modules/products/products.service";
import { ProductsController } from "@/modules/products/products.controller";
import { PrismaService } from "@/common/prisma.service";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
