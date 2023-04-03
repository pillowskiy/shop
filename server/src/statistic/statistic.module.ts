import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  imports: [UserModule],
})
export class StatisticModule {}
