using System;
using System.Collections.Generic;

namespace BusinessManagement.Data;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public int DepartmentId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Position { get; set; } = null!;

    public string Salary { get; set; } = null!;

    public virtual Department Department { get; set; } = null!;
}
