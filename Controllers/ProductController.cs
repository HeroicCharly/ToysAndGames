using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToysAndGames.Models;

namespace ToysAndGames.Controllers
{
    //api/Product/GetAllProducts
    [Route("api/[controller]/[action]")]
    public class ProductController : Controller
    {
        [HttpGet]
        public IEnumerable<Product> GetAllProducts()
        {
            //TODO Finish the repository
            var productsList = new List<Product>();
            productsList.Add(new Product(1, "Stuffed Lion", "Stuffed animal", 10, "Mattel", 100));
            productsList.Add(new Product(2, "Boardgame", "board game", 11, "Mattel", 10));

            return productsList;
        }

        [HttpPost]
        public bool SaveProducts([FromBody]IEnumerable<Product> productsList)
        {
            //TODO: Implement saving to JSON

            return false;
        }
    }
}