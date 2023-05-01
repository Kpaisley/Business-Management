using BusinessManagement.Data;
using BusinessManagement.Data.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BusinessManagement.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly BusinessManagementContext _context;

        public DepartmentsController(BusinessManagementContext context)
        {
            _context = context;
        }

        // GET api/<DepartmentsController>/5
        [HttpGet("{companyID}")]
        public IEnumerable<Department> Get(string companyID)
        {
            var departments = _context.Departments.Where(d => d.CompanyId == companyID).ToList();
            return departments;
        }

        //ADD A DEPARTMENT
        // POST api/<DepartmentsController>
        [HttpPost]
        public IEnumerable<Department> Post([FromBody] AddDepartmentDTO department)
        {
            Department departmentToAdd = new Department { CompanyId = department.companyId, DepartmentName = department.departmentName };
            _context.Departments.Add(departmentToAdd);
            _context.SaveChanges();

            var departments = _context.Departments.Where(d => d.CompanyId.Equals(department.companyId)).ToList();
            return departments;
        }

        //MODIFY AN EXISTING DEPARTMENT
        // PUT api/<DepartmentsController>/5
        [HttpPut("{departmentId}")]
        public IEnumerable<Department> Put(string departmentId, [FromBody] ModifyDepartmentDTO department)
        {
            var departmentToEdit = _context.Departments.FirstOrDefault(d => d.CompanyId.Equals(departmentId) && d.DepartmentId == department.departmentId);

            if (departmentToEdit != null)
            {
                departmentToEdit.DepartmentName = department.departmentName;
                _context.SaveChanges();
            }
            else if (departmentToEdit == null)
            {
                throw new Exception();
            }

            var departments = _context.Departments.Where(d => d.CompanyId.Equals(departmentId)).ToList();
            return departments;
        }

        // DELETE api/<DepartmentsController>/5
        [HttpDelete]
        public IEnumerable<Department> Delete([FromBody] DeleteDepartmentDTO department)
        {
            var departmentToDelete = _context.Departments.FirstOrDefault(d => d.CompanyId.Equals(department.companyId) && d.DepartmentId == department.departmentId);
            var employeesToDelete = _context.Employees.Where(e => e.DepartmentId == department.departmentId).ToList();
            

            if (departmentToDelete != null)
            {

                if (employeesToDelete.Count > 0)
                {
                    for (int i = 0; i < employeesToDelete.Count; i++)
                    {
                        _context.Employees.Remove(employeesToDelete[i]);
                    }
                }

                _context.Departments.Remove(departmentToDelete);
                _context.SaveChanges();

            }
            else if (departmentToDelete == null)
            {
                throw new Exception();
            }

            var departments = _context.Departments.Where(d => d.CompanyId.Equals(department.companyId)).ToList();
            return departments;

            



        }
    }
}
