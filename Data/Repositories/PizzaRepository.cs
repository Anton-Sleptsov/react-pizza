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
    }
}
