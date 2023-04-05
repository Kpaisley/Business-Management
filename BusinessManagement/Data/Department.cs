using System;
using System.Collections.Generic;

namespace BusinessManagement.Data;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string CompanyId { get; set; } = null!;

    public string DepartmentName { get; set; } = null!;

    public virtual ICollection<Employee> Employees { get; } = new List<Employee>();
}
