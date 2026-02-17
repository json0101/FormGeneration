using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserApp.Service.Commons;

namespace UserApp.Service.Services.UserRole.Dtos
{
    public class UserRoleGridDto: BaseDto
    {
        public string Description { get; set; }
        
        public UserRoleGridDto() { }
    }
}
