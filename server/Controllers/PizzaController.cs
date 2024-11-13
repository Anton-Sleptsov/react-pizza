using Data.Models;
using Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("{controller}")]
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

        [HttpGet("GetAllSortAndOrder")]
        public IActionResult GetAllSortAndOrder(string sortBy, string order)
        {
            var pizzasData = _pizzaRepository.GetAllSortAndOrder(sortBy, order);

            var pizzas = pizzasData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }

        [HttpGet("GetAllByCategory")]
        public IActionResult GetAllByCategory(string sortBy, string order, int category)
        {
            var pizzasData = _pizzaRepository.GetByCategory(sortBy, order, category);

            var pizzas = pizzasData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }

        [HttpGet("GetAllBySearchText")]
        public IActionResult GetAllBySearchText(string sortBy, string order, string searchText)
        {
            var pizzasData = _pizzaRepository.GetBySearchText(sortBy, order, searchText);

            var pizzas = pizzasData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }

        [HttpGet("GetAllByCategoryAndSearchText")]
        public IActionResult GetAllByCategoryAndSearchText(string sortBy, string order, int category, string searchText)
        {
            var pizzasDataBySearch = _pizzaRepository.GetBySearchText(sortBy, order, searchText);
            var pizzasDataByCategory = _pizzaRepository.GetByCategory(sortBy, order, category);
            var pizzasData = pizzasDataBySearch.Intersect(pizzasDataByCategory);

            var pizzas = pizzasData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }
    }
}
