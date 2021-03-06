import { OrNull, PatientStatistics, StatisticsDataset } from 'src/types';

import { MonthEnum } from 'src/enums';
import React from 'react';
import { ReduxState } from 'src/redux/reducers';
import { average } from './utils';
import { useSelector } from 'react-redux';

type Vitals = {
  labels: Array<MonthEnum>;
  datasets: Array<
    StatisticsDataset<'Systolic' | 'Diastolic' | 'Heart Rate', Array<number>>
  >;
};

export const useVitals = (): Vitals => {
  const vitalsLength = React.useRef(12);

  const statistics = useSelector(
    (state: ReduxState): OrNull<PatientStatistics> =>
      state.patientStatistics.data
  );

  return React.useMemo(
    (): Vitals => ({
      labels: Object.values(MonthEnum),
      datasets: [
        {
          label: `Systolic`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: `rgba(75,192,192,0.4)`,
          borderColor: `rgba(75,192,192,1)`,
          pointRadius: 1,
          data: statistics?.bpSystolicReadingsMonthly
            ? Array(vitalsLength.current)
                .fill(null)
                .map((_: null, index: number): number => {
                  return average(
                    statistics.bpSystolicReadingsMonthly?.[index] ?? []
                  );
                })
            : [],
        },
        {
          label: `Diastolic`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: `rgba(148,0,211,0.4)`,
          borderColor: `rgba(148,0,211,1)`,
          pointRadius: 1,
          data: statistics?.bpDiastolicReadingsMonthly
            ? Array(vitalsLength.current)
                .fill(null)
                .map((_: null, index: number): number => {
                  return average(
                    statistics.bpDiastolicReadingsMonthly?.[index] ?? []
                  );
                })
            : [],
        },
        {
          label: `Heart Rate`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: `rgba(255,127,80,0.4)`,
          borderColor: `rgba(255,127,80,1)`,
          pointRadius: 1,
          data: statistics?.heartRateReadingsMonthly
            ? Array(vitalsLength.current)
                .fill(null)
                .map((_: null, index: number): number => {
                  return average(
                    statistics.heartRateReadingsMonthly?.[index] ?? []
                  );
                })
            : [],
        },
      ],
    }),
    [statistics]
  );
};
