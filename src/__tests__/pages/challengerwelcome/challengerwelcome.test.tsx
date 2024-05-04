import ChallengerWelcome from '@/app/challengerwelcome/page';
import { RewardsContext, RewardsContextType } from '@/contexts/rewards-context';
import { Reward } from "@/model/types/reward.type";
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Builder } from 'builder-pattern';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('ChallengerWelcome', () => {
    afterEach(cleanup);
    it('opens the signup page when the first button is clicked', async () => {
      mockRouter.push("/initial-path");
      const user = userEvent.setup();

      render (
        <ChallengerWelcome />
      );

      const fgetStartedbtn = screen.getAllByRole('button')[0];
      await user.click(fgetStartedbtn);
      expect(mockRouter).toMatchObject({asPath: "/signup"});
    });

    it('opens the signup page when the second button is clicked', async () => {
      mockRouter.push("/initial-path");
      const user = userEvent.setup();

      render (
        <ChallengerWelcome />
      );

      const sgetStartedbtn = screen.getAllByRole('button')[1];
      await user.click(sgetStartedbtn); 
      expect(mockRouter).toMatchObject({asPath: "/signup"});
    });

    it("Displays different text for step four if there are rewards available", async () => {
      const rewardsArray: Array<Reward> = [{
        businessDescription:"At Chefus, everything we do is to bring a chef-made meal with fresh ingredients to your table at an incredible price.",
        businessLink:"https://www.chefus.com/",
        businessType:"Online deliveries",
        locationDescription:"Online",
        locationType:"Online",
        logo:"/assets/partner-logos/chefus.png",
        name:"Chefus",
        redemptionDescription:"Use code CHEFUS8BY8 at checkout.",
        rewardAvailable:true,
        rewardConditions:"CHEFUS8BY8",
        rewardDescription:"Get $10 off on orders of $20+.",
        rewardEndDate: new Date("2050-09-01"),
        rewardLink:"https://www.chefus.com/",
        rewardStartDate:new Date("2022-08-01"),
        rewardType:"Online",
      }];
      const rewardsCtxValue = Builder<RewardsContextType>().rewards(rewardsArray).build();

      render(
        <RewardsContext.Provider value={rewardsCtxValue}>
          <ChallengerWelcome />
        </RewardsContext.Provider>
      );

      const stepFourInstruction = screen.queryByText("When all 8 of your friends took action in your challenge within 8 days, and you win! Then select and enjoy a reward from one of our amazing partners.");
      expect(stepFourInstruction).toBeInTheDocument();
    });

  });