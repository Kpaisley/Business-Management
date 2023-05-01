using BusinessManagement.Data;
using BusinessManagement.Data.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
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

        //RETURN A USER'S PRODUCTS
        // GET api/<ProductsController>/5
        [HttpGet("{companyID}")]
        public IEnumerable<Product> Get(string companyID)
        {
            var products = _context.Products.Where(p => p.CompanyId == companyID).ToList();
            return products;
        }


        //ADD A PRODUCT
        // POST api/<ProductsController>
        [HttpPost]
        public IEnumerable<Product> Post([FromBody] AddProductDTO value)
        {
            Product productToAdd = new Product { CompanyId = value.companyId, ProductName = value.productName, UnitPrice = value.unitPrice, UnitsInStock = value.unitsInStock };
            _context.Products.Add(productToAdd);
            _context.SaveChanges();

            var products = _context.Products.ToList().Where(p => p.CompanyId.Equals(value.companyId)).ToList();
            return products;
        }

        
        //INCREMENT OR DECREMENT PRODUCT QUANTITY
        // PUT api/<ProductsController>/5
        [HttpPut]
        public IEnumerable<Product> Put([FromBody] ChangeProductQuantityDTO value)
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
            else if (productToChange == null)
            {
                throw new Exception();
            }
            var products = _context.Products.Where(p => p.CompanyId.Equals(value.companyId));
            return products;
        }

        //MODIFY AN EXISTING PRODUCT
        [HttpPut("{companyId}")]
        public IEnumerable<Product> Put(string companyId, [FromBody] ModifyProductDTO value)
        {
            var productToModify = _context.Products.FirstOrDefault(p => p.ProductId == value.productId && p.CompanyId.Equals(companyId));

            if (productToModify != null)
            {
                productToModify.ProductName = value.productName;
                productToModify.UnitPrice = value.unitPrice;
                productToModify.UnitsInStock = value.unitsInStock;
                _context.SaveChanges();
            }
            else if (productToModify == null)
            {
                throw new Exception();
            }

            var products = _context.Products.Where(p => p.CompanyId.Equals(companyId)).ToList();
            return products;
        }


        //DELETE A PRODUCT
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
            else if(productToDelete == null)
            {
                throw new Exception();
            }
            var products = _context.Products.Where(p => p.CompanyId.Equals(product.companyId));
            return products;
        }
    }
}
