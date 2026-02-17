using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserApp.Service.Services.UserRole.Dtos
{
    public record UpdateUserRoleDto(int userRoleId, string description): CreateUserRoleDto(description);
    
}
