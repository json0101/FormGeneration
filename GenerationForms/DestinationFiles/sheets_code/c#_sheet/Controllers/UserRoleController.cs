using Microsoft.AspNetCore.Mvc;
using UserApp.Service.Services.UserRoles;
using UserApp.Service.Services.UserRoles.Dtos;

namespace UserApp.Api.Controllers.UserRoles
{
    [Route("[controller]")]
    [ApiController]
    public class UserRoleController : Controller
    {
        IUserRoleService _user-roleService;
        public UserRoleController(IUserRoleService user-roleService) {
            _user-roleService = user-roleService;
        }

        [HttpGet("to-edit/{userRoleId}")]
        public IResult GetToEdit(int userRoleId)
        {
            var resume = _user-roleService.GetUserRoleToEdit(userRoleId);
            return Results.Ok(resume);
        }

        [HttpGet("resume")]
        public IResult GetResume()
        {
            var resume = _user-roleService.GetAllResume();
            return Results.Ok(resume);
        }

        [HttpGet("grid")]
        public IResult GetGrid()
        {
            var grid = _user-roleService.GetGrid();
            return Results.Ok(grid);
        }

        [HttpPost()]
        public IResult Create(CreateUserRoleDto createDto)
        {
            var id = _user-roleService.CreateUserRole(createDto);
            return Results.Ok(id);
        }

        [HttpPut()]
        public IResult Update(UpdateUserRoleDto update)
        {
            _user-roleService.Update(update);
            return Results.Ok("Updated");
        }

        [HttpDelete("{userRoleId}")]
        public IResult Delete(int userRoleId)
        {
            _user-roleService.Delete(userRoleId);
            return Results.Ok("Eliminado");
        }
    }
}
