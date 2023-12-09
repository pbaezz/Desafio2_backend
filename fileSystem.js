import {promises as fs} from 'fs'

class ProductManager {
    constructor(){
        this.path = "./data.txt"
        this.prod = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++
        
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.prod.push(newProduct)

        await fs.writeFile (this.path, JSON.stringify(this.prod))
    }

    readProducts = async () => {
        let result = await fs.readFile(this.path, "utf-8")
        return JSON.parse(result)
    }

    getProducts = async () => {
        let resultProd = await this.readProducts()
        console.log(resultProd)
    }

    getProductById = async (id) => {
        let resultProdUni = await this.readProducts()
        !resultProdUni.find(prodId => prodId.id === id) ? console.log('404 - Not Found') : console.log(resultProdUni.find(prodId => prodId.id === id))
    }

    deleteProduct = async (id) => {
        let prodDelete = await this.readProducts()
        let prodFilter = prodDelete.filter(products => products.id != id)
        await fs.writeFile (this.path, JSON.stringify(prodFilter))
        console.log('Producto Eliminado')
    }

    updateProduct = async ({id, ...prodUd}) => {
        await this.deleteProduct(id)
        let oldProduct = await this.readProducts()
        let modificatedProd = [{...prodUd, id}, ...oldProduct]
        await fs.writeFile (this.path, JSON.stringify(modificatedProd))
    }
}

const dataProd = new ProductManager

dataProd.addProduct("Producto Prueba1", "Este es un Producto de Prueba1", 200, "Sin Imagen1", "abc123", 35)
dataProd.addProduct("Producto Prueba2", "Este es un Producto de Prueba2", 300, "Sin Imagen2", "abc124", 25)

dataProd.getProducts() 

dataProd.getProductById()
dataProd.getProductById()

dataProd.deleteProduct()

dataProd.updateProduct({
    title: 'Producto Modif', 
    description: 'Este es un Producto Modificado', 
    price: 2200, 
    thumbnail: 'Sin ImgModif', 
    code: 'abc12345', 
    stock: 5, 
    id: 2 
})