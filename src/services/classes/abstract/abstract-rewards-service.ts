import type { Reward } from '@/model/types/reward.type';
import { injectable } from 'inversify';

/*
  By using abstract classes to define the shape of our service classes, we will
  be able to test that providers of service classes provide instances of
  specific services, which would be difficult to test if we used interfaces
  for this purpose.
*/
@injectable()
export abstract class AbstractRewardsService {
  public abstract rewards: Array<Reward>;
}
