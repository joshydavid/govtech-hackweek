import { TbGift, TbScan, TbUser } from "react-icons/tb";

export enum TabsEnum {
  REWARDS = "Rewards",
  SCAN = "Scan",
  PROFILE = "Profile",
  VERIFICATION = "Verification",
}

export interface TabsType {
  label: TabsEnum;
  icon: any;
}

export const tabs: TabsType[] = [
  {
    label: TabsEnum.REWARDS,
    icon: TbGift,
  },
  {
    label: TabsEnum.SCAN,
    icon: TbScan,
  },
  {
    label: TabsEnum.PROFILE,
    icon: TbUser,
  },
  {
    label: TabsEnum.VERIFICATION,
    icon: TbUser,
  },
];
