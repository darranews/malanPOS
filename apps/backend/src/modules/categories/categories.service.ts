// src/modules/categories/categories.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/common/prisma.service";
import { CreateCategoryDto } from "@/modules/categories/dto/create-category.dto";
import { UpdateCategoryDto } from "@/modules/categories/dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { products: true },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!category) throw new NotFoundException("Category not found");
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
