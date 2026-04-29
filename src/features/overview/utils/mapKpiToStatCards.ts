export const mapKpiToStatCards = (kpi: any) => {
  return [
    {
      id: 1,
      title: 'Revenue',
      icon: 'Banknote' as const,
      amount: kpi.totalRevenue,
      details: [
        {
          id: 1,
          title: 'Online',
          amount: kpi.onlineRevenue,
        },
        {
          id: 2,
          title: 'Offline',
          amount: kpi.posRevenue,
        },
      ],
      colors: {
        background: '#E9D8FD',
        primary: '#581C87',
        secondary: '#7E3BB2',
      },
    },
    {
      id: 2,
      title: 'Orders',
      icon: 'ShoppingBag' as const,
      value: kpi.totalOrders,
      details: [
        {
          id: 1,
          title: 'Avg. Value',
          amount: kpi.averageOrderValue,
        },
        {
          id: 2,
          title: 'Offline',
          value: kpi.totalPosSales,
        },
      ],
      colors: {
        background: '#D1FAE5',
        primary: '#14532D',
        secondary: '#1F7A45',
      },
    },
    {
      id: 3,
      title: 'Products',
      icon: 'Archive' as const,
      value: kpi.totalProducts,
      details: [
        {
          id: 1,
          title: 'Low Stock Items',
          value: kpi.lowStockProducts,
        },
      ],
      colors: {
        background: '#DBEAFE',
        primary: '#1E3A8A',
        secondary: '#3B5FCC',
      },
    },
    {
      id: 4,
      title: 'Customers',
      icon: 'UsersRound' as const,
      value: kpi.totalCustomers,
      colors: {
        background: '#FCE7F3',
        primary: '#88204B',
        secondary: '#B23A6B',
      },
    },
  ];
};
