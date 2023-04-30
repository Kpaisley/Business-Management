using BusinessManagement.Data;
using BusinessManagement.Data.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using System.Transactions;

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
        public int Get()
        {
            return 5;
        }

        //RETURN ALL EMPLOYEES FROM EACH DEPARTMENT ASSOCIATED WITH CompanyId
        // GET api/<EmployeesController>/5
        [HttpGet("{companyID}")]
        public IEnumerable<Employee> Get(string companyID)
        {
            var departments = _context.Departments.Where(d => d.CompanyId.Equals(companyID)).ToList();

            var empList = new List<Employee>();

            for (int i = 0; i < departments.Count; i++)
            {
                var employees = _context.Employees.Where(e => e.DepartmentId == departments[i].DepartmentId).ToList();

                foreach(var emp in employees)
                {
                    empList.Add(new Employee { DepartmentId = emp.DepartmentId, EmployeeId = emp.EmployeeId, FirstName = emp.FirstName, LastName = emp.LastName, Position = emp.Position, Salary = emp.Salary });
                }
            }
            return empList;


            //var employees = _context.Employees.Where(e => e.DepartmentId == departmentID).ToList();
            //return employees;
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


        //DELETE A PRODUCT
        // DELETE api/<EmployeesController>/5
        [HttpDelete]
        public void Delete([FromBody] DeleteEmployeeDTO employee)
        {
            var department = _context.Departments.FirstOrDefault(d => d.DepartmentId == employee.departmentId && d.CompanyId.Equals(employee.companyId));

            if (department!= null)
            {
                var employeeToDelete = _context.Employees.FirstOrDefault(e => e.DepartmentId == employee.departmentId && e.EmployeeId == employee.employeeId);

                if (employeeToDelete != null)
                {
                    _context.Employees.Remove(employeeToDelete);
                    _context.SaveChanges();
                }
            }
        }
    }
}
