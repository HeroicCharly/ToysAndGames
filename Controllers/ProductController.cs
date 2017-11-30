using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToysAndGames.Models;

namespace ToysAndGames.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        [HttpGet]
        public IEnumerable<Product> GetAllProducts(){
            //TODO Finish the repository
            return null;
        }

        [HttpPost]
        public bool SaveProducts(){
            //TODO: Implement saving to JSON

            return false;
        }
    }
}