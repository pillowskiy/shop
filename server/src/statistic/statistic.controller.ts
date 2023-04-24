import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('/:id')
  public async getStatistic(@Param('id', ParseIntPipe) userId: number) {
    return this.statisticService.getStatistic(userId);
  }
}
