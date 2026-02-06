using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserApp.Domain.Entities;
using UserApp.Repository;
using UserApp.Service.Services.UserRoles.Dtos;


namespace UserApp.Service.Services.UserRoles
{
    public class UserRoleService : IUserRoleService
    {
        private readonly IRepository<UserRole> _user-roleRepository;
        public UserRoleService(IRepository<UserRole> user-roleRepository) {
            _user-roleRepository = user-roleRepository;
        }

        public int CreateUserRole(CreateUserRoleDto create)
        {
            UserRole user-role = new UserRole();
            user-role.Description = create.description;
            user-role.CreatedAt = DateTime.Now.ToUniversalTime();
            user-role.CreatedBy = "";
            user-role.Active = true;

            _user-roleRepository.Insert(user-role);
            _user-roleRepository.SaveChanges();

            return user-role.Id;
        }

        public List<UserRoleResumeDto> GetAllResume()
        {
            var user-roleResume = (from r in _user-roleRepository.GetDbSet()
                             where r.Active
                             select new UserRoleResumeDto(r.Id, r.Description)
                             ).ToList();

            return user-roleResume;
        }

        public List<UserRoleGridDto> GetGrid()
        {
            var user-roleGrid = (from userR in _user-roleRepository.GetDbSet()
                             where userR.Active
                             select new UserRoleGridDto()
                                 {
                                     Id = userR.Id,
                                     Description = userR.Description,
                                     CreatedAt = userR.CreatedAt,
                                     CreatedBy = userR.CreatedBy,
                                     UpdatedAt = userR.UpdatedAt,
                                     UpdatedBy = userR.UpdatedBy,
                                     Active = userR.Active,
                                 }       
                             ).ToList();

            return user-roleGrid;
        }

        public void Delete(int userRoleId)
        {
            var user-role = _user-roleRepository.GetDbSet().Where(userR => userR.Id == userRoleId).FirstOrDefault();

            if (user-role == null) {
                throw new Exception("El user-role no se encontro");
            }

            user-role.UpdatedAt = DateTime.Now.ToUniversalTime();
            user-role.UpdatedBy = "";
            user-role.Active = false;
            _user-roleRepository.SaveChanges();
        }

        public UserRoleToEditDto GetUserRoleToEdit(int userRoleId)
        {
            var user-role = (from userR in _user-roleRepository.GetDbSet()
                            where userR.Id == userRoleId
                            select new UserRoleToEditDto(userR.Id, userR.Description)
                        )
                        .FirstOrDefault();

            if (user-role == null)
            {
                throw new Exception("No se encontro el user-role");
            }

            return user-role;
        }

        public void Update(UpdateUserRoleDto update)
        {
            var user-role = _user-roleRepository.GetDbSet().Where(userR => userR.Id == update.userRoleId).FirstOrDefault();

            if (user-role == null)
            {
                throw new Exception("No se encontro el user-role");
            }

            user-role.Description = update.description;

            user-role.UpdatedAt = DateTime.Now.ToUniversalTime();
            user-role.UpdatedBy = "";
            
            _user-roleRepository.SaveChanges();
        }
    }
}
