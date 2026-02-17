using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserApp.Domain.Entities;
using UserApp.Repository;
using UserApp.Service.Services.UserRole.Dtos;


namespace UserApp.Service.Services.UserRole
{
    public class UserRoleService : IUserRoleService
    {
        private readonly IRepository<UserRole> _user_roleRepository;
        public UserRoleService(IRepository<UserRole> user_roleRepository) {
            _user_roleRepository = user_roleRepository;
        }

        public int CreateUserRole(CreateUserRoleDto create)
        {
            UserRole user_role = new UserRole();
            user_role.Description = create.description;
            user_role.CreatedAt = DateTime.Now.ToUniversalTime();
            user_role.CreatedBy = "";
            user_role.Active = true;

            _user_roleRepository.Insert(user_role);
            _user_roleRepository.SaveChanges();

            return user_role.Id;
        }

        public List<UserRoleResumeDto> GetAllResume()
        {
            var user_roleResume = (from r in _user_roleRepository.GetDbSet()
                             where r.Active
                             select new UserRoleResumeDto(r.Id, r.Description)
                             ).ToList();

            return user_roleResume;
        }

        public List<UserRoleGridDto> GetGrid()
        {
            var user_roleGrid = (from userR in _user_roleRepository.GetDbSet()
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

            return user_roleGrid;
        }

        public void Delete(int userRoleId)
        {
            var user_role = _user_roleRepository.GetDbSet().Where(userR => userR.Id == userRoleId).FirstOrDefault();

            if (user_role == null) {
                throw new Exception("El user_role no se encontro");
            }

            user_role.UpdatedAt = DateTime.Now.ToUniversalTime();
            user_role.UpdatedBy = "";
            user_role.Active = false;
            _user_roleRepository.SaveChanges();
        }

        public UserRoleToEditDto GetUserRoleToEdit(int userRoleId)
        {
            var user_role = (from userR in _user_roleRepository.GetDbSet()
                            where userR.Id == userRoleId
                            select new UserRoleToEditDto(userR.Id, userR.Description)
                        )
                        .FirstOrDefault();

            if (user_role == null)
            {
                throw new Exception("No se encontro el user_role");
            }

            return user_role;
        }

        public void Update(UpdateUserRoleDto update)
        {
            var user_role = _user_roleRepository.GetDbSet().Where(userR => userR.Id == update.userRoleId).FirstOrDefault();

            if (user_role == null)
            {
                throw new Exception("No se encontro el user_role");
            }

            user_role.Description = update.description;

            user_role.UpdatedAt = DateTime.Now.ToUniversalTime();
            user_role.UpdatedBy = "";
            
            _user_roleRepository.SaveChanges();
        }
    }
}
