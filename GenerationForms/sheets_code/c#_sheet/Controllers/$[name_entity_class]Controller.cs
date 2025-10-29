using Microsoft.AspNetCore.Mvc;
using UserApp.Service.Services.$[cshart_namespace];
using UserApp.Service.Services.$[cshart_namespace].Dtos;

namespace UserApp.Api.Controllers.$[cshart_namespace]
{
    [Route("[controller]")]
    [ApiController]
    public class $[name_entity_class]Controller : Controller
    {
        I$[name_entity_class]Service _$[name_entity]Service;
        public $[name_entity_class]Controller(I$[name_entity_class]Service $[name_entity]Service) {
            _$[name_entity]Service = $[name_entity]Service;
        }

        [HttpGet("to-edit/{$[name_id]}")]
        public IResult GetToEdit(int $[name_id])
        {
            var resume = _$[name_entity]Service.Get$[name_entity_class]ToEdit($[name_id]);
            return Results.Ok(resume);
        }

        [HttpGet("resume")]
        public IResult GetResume()
        {
            var resume = _$[name_entity]Service.GetAllResume();
            return Results.Ok(resume);
        }

        [HttpGet("grid")]
        public IResult GetGrid()
        {
            var grid = _$[name_entity]Service.GetGrid();
            return Results.Ok(grid);
        }

        [HttpPost()]
        public IResult Create(Create$[name_entity_class]Dto createDto)
        {
            var id = _$[name_entity]Service.Create$[name_entity_class](createDto);
            return Results.Ok(id);
        }

        [HttpPut()]
        public IResult Update(Update$[name_entity_class]Dto update)
        {
            _$[name_entity]Service.Update(update);
            return Results.Ok("Updated");
        }

        [HttpDelete("{$[name_id]}")]
        public IResult Delete(int $[name_id])
        {
            _$[name_entity]Service.Delete($[name_id]);
            return Results.Ok("Eliminado");
        }
    }
}
