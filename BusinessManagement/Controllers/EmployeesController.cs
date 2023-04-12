using BusinessManagement.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusinessManagement.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly BusinessManagementContext _context;

        public EmployeesController(BusinessManagementContext context)
        {
            _context = context;
        }


        // GET: api/<EmployeesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{departmentID}")]
        public IEnumerable<Employee> Get(int departmentID)
        {
            var employees = _context.Employees.Where(e => e.DeparmentId == departmentID).ToList();
            return employees;
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
