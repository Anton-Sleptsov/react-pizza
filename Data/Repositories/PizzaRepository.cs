using Data.Models;

namespace Data.Repositories
{
    public class PizzaRepository
    {
        private PizzaDbContext _context;
        public PizzaRepository(PizzaDbContext context)
        {
            _context = context;
        }

        public Pizza Create(Pizza data)
        {
            _context.Pizzas.Add(data);
            _context.SaveChanges();
            return data;
        }

        public Pizza? GetById(int id)
        {
            return _context.Pizzas.FirstOrDefault(pizza => pizza.Id == id);
        }

        public List<Pizza> GetAll()
        {
            return _context.Pizzas.ToList();
        }

        public List<Pizza> GetAllSortAndOrder(string sortBy, string order)
        {
            IQueryable<Pizza> pizzas;
            switch (sortBy)
            {
                case "rating":
                    if (order == "desc")
                    {
                        pizzas = _context.Pizzas.OrderByDescending(pizza => pizza.Rating);
                    }
                    else
                    {
                        pizzas = _context.Pizzas.OrderBy(pizza => pizza.Rating);
                    }
                    break;
                case "price":
                    if (order == "desc")
                    {
                        pizzas = _context.Pizzas.OrderByDescending(pizza => pizza.Price);
                    }
                    else
                    {
                        pizzas = _context.Pizzas.OrderBy(pizza => pizza.Price);
                    }
                    break;
                case "title":
                    if (order == "desc")
                    {
                        pizzas = _context.Pizzas.OrderByDescending(pizza => pizza.Title);
                    }
                    else
                    {
                        pizzas = _context.Pizzas.OrderBy(pizza => pizza.Title);
                    }
                    break;
                default:
                    throw new ArgumentException("Sort does not exist");
            }
            return pizzas.ToList();
        }

        public List<Pizza> GetByCategory(string sortBy, string order, int category)
        {
            var pizzas = GetAllSortAndOrder(sortBy, order);
            return pizzas.Where(pizza => pizza.Category == category).ToList();
        }

        public List<Pizza> GetBySearchText(string sortBy, string order, string searchText)
        {
            var pizzas = GetAllSortAndOrder(sortBy, order);
            return pizzas
                .Where(pizza => pizza.Title
                    .Contains(searchText, StringComparison.CurrentCultureIgnoreCase))
                .ToList();
        }
    }
}
