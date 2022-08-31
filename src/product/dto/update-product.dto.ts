import { IsNotEmpty, IsOptional,IsNumber, IsString } from "class-validator"

export class UpdateProductDto  {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsNumber()
    @IsOptional()
    readonly price?: number;
}