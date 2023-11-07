import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class ImageOrder {
  @IsUUID(4)
  @IsNotEmpty()
  id: string

  @IsNumber()
  @IsNotEmpty()
  order: number
}

export class UpdatePostImageOrderDto {
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ImageOrder)
  @ArrayMinSize(1)
  items: ImageOrder[]
}
