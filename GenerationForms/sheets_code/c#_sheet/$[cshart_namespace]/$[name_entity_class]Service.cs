using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserApp.Domain.Entities;
using UserApp.Repository;
using UserApp.Service.Services.$[cshart_namespace].Dtos;


namespace UserApp.Service.Services.$[cshart_namespace]
{
    public class $[name_entity_class]Service : I$[name_entity_class]Service
    {
        private readonly IRepository<$[name_entity_class]> _$[name_entity]Repository;
        public $[name_entity_class]Service(IRepository<$[name_entity_class]> $[name_entity]Repository) {
            _$[name_entity]Repository = $[name_entity]Repository;
        }

        public int Create$[name_entity_class](Create$[name_entity_class]Dto create)
        {
            $[name_entity_class] $[name_entity] = new $[name_entity_class]();
            $[name_entity].Description = create.description;
            $[name_entity].CreatedAt = DateTime.Now.ToUniversalTime();
            $[name_entity].CreatedBy = "";
            $[name_entity].Active = true;

            _$[name_entity]Repository.Insert($[name_entity]);
            _$[name_entity]Repository.SaveChanges();

            return $[name_entity].Id;
        }

        public List<$[name_entity_class]ResumeDto> GetAllResume()
        {
            var $[name_entity]Resume = (from r in _$[name_entity]Repository.GetDbSet()
                             where r.Active
                             select new $[name_entity_class]ResumeDto(r.Id, r.Description)
                             ).ToList();

            return $[name_entity]Resume;
        }

        public List<$[name_entity_class]GridDto> GetGrid()
        {
            var $[name_entity]Grid = (from $[name_ef_query] in _$[name_entity]Repository.GetDbSet()
                             where $[name_ef_query].Active
                             select new $[name_entity_class]GridDto()
                                 {
                                     Id = $[name_ef_query].Id,
                                     Description = $[name_ef_query].Description,
                                     CreatedAt = $[name_ef_query].CreatedAt,
                                     CreatedBy = $[name_ef_query].CreatedBy,
                                     UpdatedAt = $[name_ef_query].UpdatedAt,
                                     UpdatedBy = $[name_ef_query].UpdatedBy,
                                     Active = $[name_ef_query].Active,
                                 }       
                             ).ToList();

            return $[name_entity]Grid;
        }

        public void Delete(int $[name_id])
        {
            var $[name_entity] = _$[name_entity]Repository.GetDbSet().Where($[name_ef_query] => $[name_ef_query].Id == $[name_id]).FirstOrDefault();

            if ($[name_entity] == null) {
                throw new Exception("El $[name_entity] no se encontro");
            }

            $[name_entity].UpdatedAt = DateTime.Now.ToUniversalTime();
            $[name_entity].UpdatedBy = "";
            $[name_entity].Active = false;
            _$[name_entity]Repository.SaveChanges();
        }

        public $[name_entity_class]ToEditDto Get$[name_entity_class]ToEdit(int $[name_id])
        {
            var $[name_entity] = (from $[name_ef_query] in _$[name_entity]Repository.GetDbSet()
                            where $[name_ef_query].Id == $[name_id]
                            select new $[name_entity_class]ToEditDto($[name_ef_query].Id, $[name_ef_query].Description)
                        )
                        .FirstOrDefault();

            if ($[name_entity] == null)
            {
                throw new Exception("No se encontro el $[name_entity]");
            }

            return $[name_entity];
        }

        public void Update(Update$[name_entity_class]Dto update)
        {
            var $[name_entity] = _$[name_entity]Repository.GetDbSet().Where($[name_ef_query] => $[name_ef_query].Id == update.$[name_id]).FirstOrDefault();

            if ($[name_entity] == null)
            {
                throw new Exception("No se encontro el $[name_entity]");
            }

            $[name_entity].Description = update.description;

            $[name_entity].UpdatedAt = DateTime.Now.ToUniversalTime();
            $[name_entity].UpdatedBy = "";
            
            _$[name_entity]Repository.SaveChanges();
        }
    }
}
