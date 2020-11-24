'use strict'

var Product = require('../models/product');
var fs = require('fs');
var path = require('path');

var controller = {

    getProduct: function(req, res){
        var productId = req.params.id;
        
        Product.findById(productId,(err,product)=>{
            if(err) return res.status(500).send({message:"Error al devolver datos..."});
            if(!product) return res.status(404).send({message :"El producto no existe..."});
            return res.status(200).send({product});            
        });        
    },

    saveProduct: function(req, res){
        
        var product = new Product();
        
        var params = req.body;
        product.name = params.name;
        product.code =params.code;
        product.price= params.price;
        product.description = params.description;
        product.image = null;

        product.save((err, productStored)=>{
            if(err) return res.status(500).send({message:"Error al guardar el producto..."});
            if(!productStored) return res.status(404).send({message :"No se ha podido guardar el producto..."});
            return res.status(200).send({product : productStored});
        });       
    },
    getProducts: function(req,res){

        Product.find({}).exec((err, products) =>{
            if(err) return res.status(500).send({message:"Error al devolver datos.."});
            if(!products) return res.status(404).send({message :"No hay productos para mostrar..."});
            return res.status(200).send({products});
        }); 
    },

    updateProduct : function(req,res){
        var productId = req.params.id;
        var update = req.body;

        Product.findByIdAndUpdate(productId, update, (err,productUpdate)=>{
            if(err) return res.status(500).send({message:"Error al actualizar datos.."});
            if(!productUpdate) return res.status(404).send({message :"No hay producto para actualizar..."});
            return res.status(200).send({productUpdate});
        });
    },

    deleteProduct : function(req,res){
        
        var productId = req.params.id;

        Product.findByIdAndDelete(productId, (err, productDelete) =>{
            if(err) return res.status(500).send({message:"Error al eliminar datos.."});
            if(!productDelete) return res.status(404).send({message :"No existe el producto..."});
            return res.status(200).send({res});
        });
    },

    uploadImage :function(req,res){
        var productId = req.params.id;
        var fileName = 'Imagen no subida...';
        
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt=='png' || fileExt=='jpg' || fileExt=='jpeg' || fileExt=='gif' ){
                Product.findByIdAndUpdate(productId,{image: fileName}, {new:true},(err,productUpdated)=>{
                    if(err) return res.status(200).send({message:'La imagen no se ha subido'});
                    if(!productUpdated) return res.status(404).send({message:'Producto no existe'});
    
                    res.status(200).send({
                        product : productUpdated
                    });
                });    
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:"La extension no es valida"});
                });
            }            
            
        }else{
            res.status(200).send({
                message : fileName
            });
        }
    },
    getImageFile: function(req,res){
            var file = req.params.image;
            var path_file = './uploads/'+file;

            fs.exists(path_file, (exits)=>{
                if(exits){
                    return res.sendFile(path.resolve(path_file))
                }else{
                    return res.status(200).send({
                        message:"No existe la imagen"
                    });
                }
            });
    }
}

module.exports = controller;