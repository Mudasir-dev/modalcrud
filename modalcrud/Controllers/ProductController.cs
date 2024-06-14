using Microsoft.AspNetCore.Mvc;
using modalcrud.DAL;
using modalcrud.Models.DBEntities;

namespace modalcrud.Controllers
{
    public class ProductController : Controller
    {

        private readonly MyAppDbContext _context;

        public ProductController(MyAppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }


        public JsonResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Json(products);
        }

        [HttpPost]
        public JsonResult Insert(PRoduct product)
        {
            if (ModelState.IsValid)
            {

                _context.Products.Add(product);
                _context.SaveChanges();
                return Json("Product Details Saved");
            
            }
            else
            {
                return Json("model validation failed");
            }
        }

        [HttpGet]
        public JsonResult Edit(int id)
        {
            var product = _context.Products.Find(id);
            return Json(product);
        }

        [HttpPost]
        public JsonResult Update(PRoduct model)
        {
            if (ModelState.IsValid)
            {
                _context.Products.Update(model);
                _context.SaveChanges();
                return Json("Products details updated");

            }
            else { 
                return Json("model validation failed");

            }
        }

        [HttpPost]
        public JsonResult Delete(int id) {

            var product = _context.Products.Find(id);
            if (product != null) { 
                _context.Products.Remove(product);
                _context.SaveChanges();
                return Json("Product details deleted");
            }
            else
            {
                return Json("Product details not found with id {id}");
            }
        }
    }
}
