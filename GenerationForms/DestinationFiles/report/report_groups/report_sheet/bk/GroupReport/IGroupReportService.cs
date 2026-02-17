using Accordis.Service.Services.Accordis.Reports.Preparation.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accordis.Service.Services.Accordis.Reports.GroupReport
{
    public interface IGroupReportService
    {
        List<GroupReportDto> GetReport(FilterGroupReportDto filters);
    }
}
