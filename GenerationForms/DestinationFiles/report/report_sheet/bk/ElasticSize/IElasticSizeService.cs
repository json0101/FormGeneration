using Accordis.Service.Services.Accordis.Reports.Preparation.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accordis.Service.Services.Accordis.Reports.ElasticSize
{
    public interface IElasticSizeService
    {
        List<ElasticSizeDto> GetReport(FilterElasticSizeDto filters);
    }
}
