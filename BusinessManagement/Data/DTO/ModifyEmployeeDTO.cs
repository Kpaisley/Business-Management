namespace BusinessManagement.Data.DTO
{
    public class ModifyEmployeeDTO
    {
        public int employeeId { get; set; }
        public int departmentId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string position { get; set; }
        public string salary { get; set; }

    }
}
