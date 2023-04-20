namespace BusinessManagement.Data.DTO
{
    public class ModifyProductDTO
    {
        public int productId { get; set; }
        public string productName { get; set; } 
        public decimal unitPrice { get; set; }
        public int unitsInStock { get; set; }

    }
}
