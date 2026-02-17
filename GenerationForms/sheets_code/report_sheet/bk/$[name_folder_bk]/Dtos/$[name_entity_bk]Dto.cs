using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accordis.Service.Services.Accordis.Reports.$[name_folder_bk].Dtos
{
    public record $[name_entity_bk]Dto(
        int id, int workGroupId, string workTable, DateTime init, DateTime? finished
        , DateTime? offTime, int? countOffTime, DateTime? totalTimeApplication
        , DateTime? totalTimeCalculated, bool preparationFinished, bool preparationInOffTime
        , DateTime createdAt, string createdBy
    );
}
