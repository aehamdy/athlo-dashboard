import * as Icons from 'lucide-react';

export type KpiDetail = {
  id: number;
  title: string;
  amount?: number;
  value?: number;
};

export type KpiCardType = {
  id: number;
  title: string;
  icon: keyof typeof Icons;
  amount?: number;
  value?: number;
  details?: KpiDetail[];
  colors: {
    background: string;
    primary: string;
    secondary: string;
  };
};
