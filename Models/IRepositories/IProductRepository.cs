using System.Collections.Generic;

namespace ToysAndGames.Models.IRepositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAllProducts();
        bool SaveProducts(IEnumerable<Product> productsList);
    }
}