using System.ComponentModel.DataAnnotations;

namespace ToysAndGames.Models
{
    public class Product
    {
        public Product(int id, string name, string description, int ageRestriction, string company, decimal price)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.AgeRestriction = ageRestriction;
            this.Company = company;
            this.Price = price;
        }

        [Required]
        public int Id { set; get; }

        [Required]
        [MaxLength(50)]
        public string Name { set; get; }

        [MaxLength(100)]
        public string Description { set; get; }

        [Range(0, 100)]
        public int AgeRestriction { set; get; }

        [Required]
        [MaxLength(50)]
        public string Company { get; set; }

        [Required]
        [Range(1, 1000)]
        public decimal Price { get; set; }
    }
}