import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService]
})
export class StatisticModule {}
