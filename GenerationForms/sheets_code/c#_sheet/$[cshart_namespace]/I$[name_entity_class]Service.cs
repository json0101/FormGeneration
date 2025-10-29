using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserApp.Service.Services.$[cshart_namespace].Dtos;

namespace UserApp.Service.Services.$[cshart_namespace]
{
    public interface I$[name_entity_class]Service
    {
        List<$[name_entity_class]ResumeDto> GetAllResume();
        List<$[name_entity_class]GridDto> GetGrid();
        int Create$[name_entity_class](Create$[name_entity_class]Dto create);
        void Delete(int $[name_id]);
        $[name_entity_class]ToEditDto Get$[name_entity_class]ToEdit(int $[name_id]);
        void Update(Update$[name_entity_class]Dto update);
    }
}
