using System;
using System.Collections.Generic;
using System.Linq;
using ToysAndGames.Models;
using ToysAndGames.Models.IRepositories;
using ToysAndGames.Services.IServices;

namespace ToysAndGames.Services.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                return _productRepository.GetAllProducts();
            }
            catch (Exception error)
            {
                throw new Exception("ProductService/GetAllProducts() CRASHED", error.InnerException);
            }
        }

        public bool SaveProducts(IEnumerable<Product> productsList)
        {
            if (productsList.Count() > 0)
            {
                return _productRepository.SaveProducts(productsList);
            }
            else
            {
                throw new ArgumentException();
            }
        }
    }
}