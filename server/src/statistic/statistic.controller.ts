import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { statistic } from 'src/config/docs';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiOperation(statistic.getByUserId.operation)
  @ApiResponse(statistic.getByUserId.response)
  @ApiParam(statistic.getByUserId.param)
  @Get('/:id')
  public async getStatistic(@Param('id', ParseIntPipe) userId: number) {
    return this.statisticService.getStatistic(userId);
  }
}
