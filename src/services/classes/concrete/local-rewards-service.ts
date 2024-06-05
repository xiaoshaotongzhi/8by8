import type { Reward } from '@/model/types/reward.type';
import { AbstractRewardsService } from '@/services/classes/abstract/abstract-rewards-service';
import { injectable } from 'inversify';

/**
 * A mock user service for local development.
 */
@injectable()
export class LocalRewardsService extends AbstractRewardsService {
  public rewards: Array<Reward> = [];
}
