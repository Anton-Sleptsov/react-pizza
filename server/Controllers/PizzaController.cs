using Data.Models;
using Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("{controller}/{action}")]
    public class PizzaController : Controller
    {
        private readonly PizzaRepository _pizzaRepository;
        private readonly PizzaMapper _pizzaMapper;

        public PizzaController(PizzaRepository pizzaRepository, PizzaMapper pizzaMapper)
        {
            _pizzaRepository = pizzaRepository;
            _pizzaMapper = pizzaMapper;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreatePizzaModel pizza)
        {
            var dataModel = _pizzaMapper.MapDataModel(pizza);
            var createdPizza = _pizzaMapper.MapViewModel(_pizzaRepository.Create(dataModel));
            return Ok(createdPizza);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get([FromQuery] int id)
        {
            var pizzaData = _pizzaRepository.GetById(id);

            if (pizzaData is null)
            {
                return NotFound();
            }
            var pizza = _pizzaMapper.MapViewModel(pizzaData);
            return Ok(pizza);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var pizzasData = _pizzaRepository.GetAll();

            var pizzas = pizzasData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }
    }
}
