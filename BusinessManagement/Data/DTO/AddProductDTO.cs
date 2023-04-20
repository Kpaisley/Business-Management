namespace BusinessManagement.Data.DTO
{
    public class AddProductDTO
    {
        public string companyId { get; set; }
        public string productName { get; set; }
        public decimal unitPrice { get; set; }
        public int unitsInStock { get; set; }

    }
}
