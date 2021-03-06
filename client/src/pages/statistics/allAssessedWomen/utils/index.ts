import { StatisticsDataset, YearGlobalStatistics } from 'src/types';

export const womenReferredPerMonth = (
  data: YearGlobalStatistics
): StatisticsDataset<
  'Total Number of Women Referred',
  YearGlobalStatistics,
  'rgba(21,21,43,0.4)'
> => ({
  label: `Total Number of Women Referred`,
  fill: false,
  lineTension: 0.1,
  backgroundColor: `rgba(21,21,43,0.4)`,
  borderColor: `rgba(21,21,43,1)`,
  pointRadius: 1,
  data,
});

export const pregnantWomenReferredPerMonth = (
  data: YearGlobalStatistics
): StatisticsDataset<
  'Total Number of Pregnant Women Referred',
  YearGlobalStatistics,
  'rgba(75,192,192,0.4)'
> => ({
  label: `Total Number of Pregnant Women Referred`,
  fill: false,
  lineTension: 0.1,
  backgroundColor: `rgba(75,192,192,0.4)`,
  borderColor: `rgba(75,192,192,1)`,
  pointRadius: 1,
  data,
});

export const pregnantWomenAssessedPerMonth = (
  data: YearGlobalStatistics
): StatisticsDataset<
  'Total Number of Pregnant Women Referred',
  YearGlobalStatistics,
  'rgba(255,127,80,0.4)'
> => ({
  label: `Total Number of Pregnant Women Referred`,
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(255,127,80,0.4)',
  borderColor: 'rgba(255,127,80,1)',
  pointRadius: 1,
  data,
});

export const womenAssessedPerMonth = (
  data: YearGlobalStatistics
): StatisticsDataset<
  'Total Number of Women Assessed',
  YearGlobalStatistics,
  'rgba(148,0,211,0.4)'
> => ({
  label: `Total Number of Women Assessed`,
  fill: false,
  lineTension: 0.1,
  backgroundColor: `rgba(148,0,211,0.4)`,
  borderColor: `rgba(148,0,211,1)`,
  pointRadius: 1,
  data,
});
