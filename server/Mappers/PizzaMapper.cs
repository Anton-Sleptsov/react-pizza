using Data.Models;
using server.Models;

namespace server.Mappers
{
    public class PizzaMapper
    {
        public PizzaModel MapViewModel(Pizza data)
            => new()
            {
                Id = data.Id,
                ImageUrl = data.ImageUrl,
                Title = data.Title,
                Types = data.Types,
                Sizes = data.Sizes,
                Price = data.Price,
                Category = data.Category,
                Rating = data.Rating,
            };

        public Pizza MapDataModel(CreatePizzaModel model)
            => new()
            {
                ImageUrl = model.ImageUrl,
                Title = model.Title,
                Types = model.Types,
                Sizes = model.Sizes,
                Price = model.Price,
                Category = model.Category,
                Rating = model.Rating,
            };
    }
}
