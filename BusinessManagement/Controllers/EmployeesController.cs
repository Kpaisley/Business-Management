﻿using BusinessManagement.Data;
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
            throw new Exception();
        }

        //MODIFY AN EXISTING EMPLOYEE
        // PUT api/<EmployeesController>/5
        [HttpPut("{companyId}")]
        public bool Put(string companyId, [FromBody] ModifyEmployeeDTO employee)
        {

            var depts = _context.Departments.Where(d => d.CompanyId == companyId).ToList();
            var departmentFound = _context.Departments.FirstOrDefault(d => d.CompanyId.Equals(companyId) && d.DepartmentId == employee.departmentId);

           if (departmentFound != null)
            {
                for (int i = 0; i < depts.Count; i++)
                {
                    if (_context.Employees.FirstOrDefault(e => e.DepartmentId == depts[i].DepartmentId && e.EmployeeId == employee.employeeId) != null)
                    {
                        var employeeToModify = _context.Employees.FirstOrDefault(e => e.DepartmentId == depts[i].DepartmentId && e.EmployeeId == employee.employeeId);

                        if (employeeToModify != null)
                        {
                            employeeToModify.DepartmentId = employee.departmentId;
                            employeeToModify.FirstName = employee.firstName;
                            employeeToModify.LastName = employee.lastName;
                            employeeToModify.Position = employee.position;
                            employeeToModify.Salary = employee.salary;
                            _context.SaveChanges();
                            return true;
                        }

                    }
                }
            }
            throw new Exception();
        }

        

        //DELETE AN EMPLOYEE
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
                else if (employeeToDelete == null)
                {
                    throw new Exception();
                }
            }
            else if (department == null)
            {
                throw new Exception();
            }
        }
    }
}
