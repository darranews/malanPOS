import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";
import { IsOptional, IsNumber, IsString, IsInt } from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsInt()
  categoryId?: number;
}
