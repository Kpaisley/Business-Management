namespace BusinessManagement.Data.DTO
{
    public class ChangeProductQuantityDTO
    {
        public string companyId { get; set; }
        public int productId { get; set; }
        public bool increment { get; set; }
    }
}
