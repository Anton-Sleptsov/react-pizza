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
        [Route("GetPizza")]
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
        public IActionResult GetAllSortAndOrder(int page, int limit, string sortBy, string order)
        {
            var pizzasData = _pizzaRepository.GetAllSortAndOrder(sortBy, order);
            var paginateData = _pizzaRepository.Paginate(page, limit, pizzasData);

            var pizzas = paginateData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }

        [HttpGet("GetAllByCategory")]
        public IActionResult GetAllByCategory(int page, int limit, string sortBy, string order, int category)
        {
            var pizzasData = _pizzaRepository.GetByCategory(sortBy, order, category);
            var paginateData = _pizzaRepository.Paginate(page, limit, pizzasData);

            var pizzas = paginateData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }

        [HttpGet("GetAllBySearchText")]
        public IActionResult GetAllBySearchText(int page, int limit, string sortBy, string order, string searchText)
        {
            var pizzasData = _pizzaRepository.GetBySearchText(sortBy, order, searchText);
            var paginateData = _pizzaRepository.Paginate(page, limit, pizzasData);

            var pizzas = paginateData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }

        [HttpGet("GetAllByCategoryAndSearchText")]
        public IActionResult GetAllByCategoryAndSearchText(int page, int limit, string sortBy, string order, int category, string searchText)
        {
            var pizzasDataBySearch = _pizzaRepository.GetBySearchText(sortBy, order, searchText);
            var pizzasDataByCategory = _pizzaRepository.GetByCategory(sortBy, order, category);
            var pizzasData = pizzasDataBySearch.Intersect(pizzasDataByCategory).ToList();
            var paginateData = _pizzaRepository.Paginate(page, limit, pizzasData);

            var pizzas = paginateData
                .Select(_pizzaMapper.MapViewModel);

            return Ok(pizzas);
        }
    }
}
