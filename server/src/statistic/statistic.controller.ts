import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { NumParam } from 'src/decorators/param.decorator';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('/:id')
  public async getStatistic(@NumParam('id') userId: number) {
    return this.statisticService.getStatistic(userId);
  }
}
