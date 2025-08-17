// src/modules/products/products.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";
import { UpdateProductDto } from "@/modules/products/dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Create new product
  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        category: {
          connect: { id: data.categoryId }, // liên kết category bằng ID
        },
      },
      include: { category: true },
    });
  }

  // Get all products
  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
      orderBy: { name: "asc" }, // sort theo ABC
    });
  }

  // Get one product
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  // Update product
  async update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        ...(data.categoryId && {
          category: { connect: { id: data.categoryId } },
        }),
      },
      include: { category: true },
    });
  }

  // Delete product
  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
