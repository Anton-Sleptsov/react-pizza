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
            IQueryable<Pizza> pizzas = sortBy switch
            {
                "rating" => order == "desc" ? _context.Pizzas.OrderByDescending(pizza => pizza.Rating)
                                                             : _context.Pizzas.OrderBy(pizza => pizza.Rating),
                "price" => order == "desc" ? _context.Pizzas.OrderByDescending(pizza => pizza.Price)
                                                             : _context.Pizzas.OrderBy(pizza => pizza.Price),
                "title" => order == "desc" ? _context.Pizzas.OrderByDescending(pizza => pizza.Title)
                                                             : _context.Pizzas.OrderBy(pizza => pizza.Title),
                _ => throw new ArgumentException("Sort does not exist"),
            };
            return [.. pizzas];
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

        public List<Pizza> Paginate(int page, int limit, List<Pizza> pizzas)
        {
            return pizzas.Skip((page - 1) * limit).Take(limit).ToList();
        }
    }
}
