﻿using BusinessManagement.Data;
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


        // GET: api/<DepartmentsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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

        // PUT api/<DepartmentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DepartmentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
