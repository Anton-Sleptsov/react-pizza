namespace server.Models
{
    public class CreatePizzaModel 
    {
        public string ImageUrl { get; set; }
        public string Title { get; set; }
        public int[] Types { get; set; }
        public int[] Sizes { get; set; }
        public int Price { get; set; }
        public int Category { get; set; }
        public int Rating { get; set; }
    }
}
