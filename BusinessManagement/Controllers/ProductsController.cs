using BusinessManagement.Data;
using BusinessManagement.Data.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusinessManagement.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly BusinessManagementContext _context;

        public ProductsController(BusinessManagementContext context)
        {
            _context = context;
        }



        // GET: api/<ProductsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProductsController>/5
        [HttpGet("{companyID}")]
        public IEnumerable<Product> Get(string companyID)
        {
            var products = _context.Products.Where(p => p.CompanyId == companyID).ToList();
            return products;
        }

        // POST api/<ProductsController>
        [HttpPost]
        public IEnumerable<Product> Post([FromBody] ChangeProductQuantityDTO value)
        {
            var productToChange = _context.Products.FirstOrDefault(p => p.CompanyId.Equals(value.companyId) && p.ProductId == value.productId);
            var increment = value.increment;

            if (productToChange != null)
            {
                if (increment == true)
                {
                    productToChange.UnitsInStock++;
                    _context.SaveChanges();
                }
                else if (increment == false && productToChange.UnitsInStock > 1)
                {
                    productToChange.UnitsInStock--;
                    _context.SaveChanges();
                }
            }
            var products = _context.Products.Where(p => p.CompanyId.Equals(value.companyId));
            return products;
           

        }

        // PUT api/<ProductsController>/5
        [HttpPut]
        public IEnumerable<Product> Put([FromBody] AddProductDTO value)
        {
            Product productToAdd = new Product { CompanyId = value.companyId, ProductName = value.productName, UnitPrice = value.unitPrice, UnitsInStock = value.unitsInStock};
            _context.Products.Add(productToAdd);
            _context.SaveChanges();

            var products = _context.Products.ToList().Where(p => p.CompanyId.Equals(value.companyId)).ToList();
            return products;
        }

        // DELETE api/<ProductsController>/5
        [HttpDelete]
        public IEnumerable<Product> Delete([FromBody] DeleteProductDTO product)
        {
            var productToDelete = _context.Products.FirstOrDefault(p => p.CompanyId.Equals(product.companyId) && p.ProductId == product.productId);
            if (productToDelete != null)
            {
                _context.Products.Remove(productToDelete);
                _context.SaveChanges();
            }
            var products = _context.Products.Where(p => p.CompanyId.Equals(product.companyId));
            return products;
        }
    }
}
