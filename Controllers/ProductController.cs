using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToysAndGames.Models;
using ToysAndGames.Services.IServices;
using ToysAndGames.Services.Services;

namespace ToysAndGames.Controllers
{
    //api/Product/GetAllProducts
    [Route("api/[controller]/[action]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            this._productService = productService;
        }

        [HttpGet]
        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                return this._productService.GetAllProducts();
            }
            catch (Exception errror)
            {
                throw new Exception("Error loading the products", errror.InnerException);
            }
        }

        [HttpPost]
        public bool SaveProducts([FromBody]IEnumerable<Product> productsList)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    this._productService.SaveProducts(productsList);
                    return true;
                }

                return false;
            }
            catch (Exception error)
            {
                throw new Exception("Error saving products", error.InnerException);
            }
        }
    }
}