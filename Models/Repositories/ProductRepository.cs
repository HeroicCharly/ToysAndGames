using System.Collections.Generic;
using ToysAndGames.Models.IRepositories;

namespace ToysAndGames.Models.Repositories
{
    public class ProductRepository : IProductRepository
    {

        public ProductRepository()
        {

        }

        public IEnumerable<Product> GetAllProducts()
        {
            //TODO: Implement JSON file loading
            throw new System.NotImplementedException();
        }

        public bool SaveProducts(IEnumerable<Product> productsList)
        {
            //TODO: Implent save information to JSON file
            throw new System.NotImplementedException();
        }
    }
}