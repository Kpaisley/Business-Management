using System;
using System.Collections.Generic;

namespace BusinessManagement.Data;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public int DeparmentId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Position { get; set; } = null!;

    public string Salary { get; set; } = null!;

    public virtual Department Deparment { get; set; } = null!;
}
