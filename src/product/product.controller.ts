import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private productService:ProductService
    ){}
    
    @Post()
    async createProduct(@Body() createProductDto:CreateProductDto){
        return this.productService.createProduct(createProductDto)
    }
    
    @Get()
    async getAllProduct(){
        return this.productService.getAllProduct()
    }

    @Get(':id')
    async findProductByID(
        @Param('id') productID:mongoose.Types.ObjectId
    ){
        return this.productService.findProductByID(productID)
    }

    @Put(':id')
    async updateProductByID(
        @Param('id') productID:mongoose.Types.ObjectId,
        @Body() updateProductDto:UpdateProductDto
    ){
        return this.productService.updateProductByID(updateProductDto,productID)
    }

    @Delete(':id')
    async deleteProductByID(
        @Param('id') productID:mongoose.Types.ObjectId,
    ){
        const deletedProduct = await this.productService.deleteProductByID(productID)
        if(deletedProduct){
            return {
                message:`item ${productID} has been deleted`
            }
        }else{
            return {
                message:`item ${productID} is not found`
            }
        }
        
    }
}
