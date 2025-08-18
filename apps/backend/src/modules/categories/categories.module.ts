// src/modules/categories/categories.module.ts
import { Module } from "@nestjs/common";
import { CategoriesService } from "@/modules/categories/categories.service";
import { CategoriesController } from "@/modules/categories/categories.controller";
import { PrismaService } from "@/common/prisma.service";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
