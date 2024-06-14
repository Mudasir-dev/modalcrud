using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace modalcrud.Models.DBEntities
{
    public class PRoduct
    {

        [Key]

        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name Required")]
        [DisplayName("Product Name")]
        public string ProductName { get; set; }

        [Required(ErrorMessage = "Product Price Required")]
        [DisplayName("Product Price")]

        public double Price { get; set; }

        [Required(ErrorMessage = "Product Quantity Required")]
        [DisplayName("Product Quantity")]
        public int qty { get; set; }
    }
}
