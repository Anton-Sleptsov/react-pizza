using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class PizzaDbContext : DbContext
    {
        public PizzaDbContext() { }
        public PizzaDbContext(DbContextOptions<PizzaDbContext> options) : base(options) { }

        public DbSet<Pizza> Pizzas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer($"Server=(localdb)\\mssqllocaldb;Database=PizzaDb;Trusted_Connection=True;");
        }
    }
}
