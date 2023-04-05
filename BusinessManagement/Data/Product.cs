using System;
using System.Collections.Generic;

namespace BusinessManagement.Data;

public partial class Product
{
    public int ProductId { get; set; }

    public string CompanyId { get; set; } = null!;

    public string ProductName { get; set; } = null!;

    public decimal UnitPrice { get; set; }

    public int UnitsInStock { get; set; }
}
