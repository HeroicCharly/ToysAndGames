using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using ToysAndGames.Models.IRepositories;

namespace ToysAndGames.Models.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IHostingEnvironment _environment;
        const string jsonFileName = "db.txt";

        public ProductRepository(IHostingEnvironment environment)
        {
            this._environment = environment;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            var path = Path.Combine(this._environment.WebRootPath, jsonFileName);
            using (StreamReader reader = new StreamReader(path))
            {
                string json = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<IEnumerable<Product>>(json);
            }
        }

        public bool SaveProducts(IEnumerable<Product> productsList)
        {
            var path = Path.Combine(this._environment.WebRootPath, jsonFileName);
            using (StreamWriter file = File.CreateText(path))
            {
                string JSon = JsonConvert.SerializeObject(productsList.ToArray());
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, productsList);
            }

            return true;
        }
    }
}