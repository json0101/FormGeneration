using Accordis.Domain.Entities.Accordis.Preparation;
using Accordis.Repository;
using Accordis.Service.Services.Accordis.Reports.Preparation.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accordis.Service.Services.Accordis.Reports.ElasticSize
{
    public class ElasticSizeService : IElasticSizeService
    {
        IRepository<PreparationEntity> _preparationRepository;
        public PreparationReportService(IRepository<PreparationEntity> preparationRepository) {
            _preparationRepository = preparationRepository;
        }
        public List<ElasticSizeDto> GetReport(FilterElasticSizeDto filters)
        {
            var preparationQuery = (from v in _preparationRepository.GetDbSet()
                               where v.Active && v.WorkGroupTableDistribution.WorkGroup.WorkPromisePlanningGroups.Any(p => p.PromisePlanning.DownloadRecordId == filters.downloadId)
                               select new PreparationReportDto
                               (
                                   v.Id,
                                   v.WorkGroupTableDistribution.WorkGroupId,
                                   v.WorkGroupTableDistribution.WorkTable.Description ?? "",
                                   v.Init,
                                   v.Finished,
                                   v.OffTime,
                                   v.NumberTimeOff,
                                   v.TotalTimeApplication,
                                   v.TotalTimeCalculated,
                                   v.PreparationFinished,
                                   v.PreparationInOffTime,
                                   v.CreatedAt,
                                   v.CreatedBy
                               )
                            );

            var sql = preparationQuery.ToQueryString();

            var preparationReport = preparationQuery.ToList();

            return preparationReport;
        }
    }
}
