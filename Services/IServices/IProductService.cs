using System.Collections.Generic;
using ToysAndGames.Models;

namespace ToysAndGames.Services.IServices
{
    public interface IProductService
    {
        IEnumerable<Product> GetAllProducts();
        bool SaveProducts(IEnumerable<Product> productsList);
    }
}