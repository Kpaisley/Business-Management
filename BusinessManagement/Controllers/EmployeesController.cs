using BusinessManagement.Data;
using BusinessManagement.Data.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

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
            var employees = _context.Employees.Where(e => e.DepartmentId == departmentID).ToList();
            return employees;
        }

        //ADD AN EMPLOYEE
        // POST api/<EmployeesController>
        [HttpPost("{companyId}")]
        public bool Post(string companyId, [FromBody] AddEmployeeDTO employee)
        {
            var departmentFound = _context.Departments.FirstOrDefault(d => d.DepartmentId == employee.departmentId && d.CompanyId.Equals(companyId));

            if (departmentFound != null)
            {
                Employee employeeToAdd = new Employee { DepartmentId = employee.departmentId, FirstName = employee.firstName, LastName = employee.lastName, Position = employee.position,
                                                        Salary = employee.salary};
                _context.Employees.Add(employeeToAdd);
                _context.SaveChanges();
                return true;
            }
            return false;
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
