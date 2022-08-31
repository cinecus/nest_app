import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) { }

    async createProduct(createDto:CreateProductDto):Promise<Product>{
        return await this.productModel.create(createDto)
    }

    async getAllProduct():Promise<Product []>{
        return await this.productModel.find()
    }

    async findProductByID(productID:mongoose.Types.ObjectId):Promise<Product>{
        return await this.productModel.findById(productID)
    }

    async updateProductByID(updateProductDto:UpdateProductDto,productID:mongoose.Types.ObjectId) {
        return await this.productModel.findByIdAndUpdate(productID,{
            '$set':updateProductDto
        },{
            new:true
        })
    }

    async deleteProductByID(productID:mongoose.Types.ObjectId){
        return await this.productModel.findByIdAndDelete(productID,{
            new:true
        })
    }
}
