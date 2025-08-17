// src/modules/products/dto/create-product.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsInt } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  price!: number;

  @IsInt()
  categoryId!: number; // bắt buộc dùng categoryId thay vì string
}
