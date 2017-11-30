using System.ComponentModel.DataAnnotations;

namespace ToysAndGames.Models
{
    public class Product
    {
        [Required]
        public int Id { set; get;}

        [Required]
        [MaxLength(50)]
        public string Name { set; get;}

        [MaxLength(100)]
        public string Description {set; get;}

        [Range(0,100)]
        public int AgeRestriction {set; get;}

        [Required]
        [MaxLength(50)]
        public string Company { get; set; }

        [Required]
        [Range(1,1000)]
        public decimal Price { get; set; }
    }
}