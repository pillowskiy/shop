import { Controller, Get, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('/:id')
  public async getStatistic(@Param('id') userId: string) {
    return this.statisticService.getStatistic(+userId);
  }
}
