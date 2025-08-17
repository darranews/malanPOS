// src/modules/categories/dto/create-category.dto.ts
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
