import { OrNull, PatientStatistics, ServerError } from '@types';
import { ServerRequestAction, serverRequestActionCreator } from '../utils';

import { Dispatch } from 'redux';
import { EndpointEnum } from '../../../server/endpoints';

enum PatientStatisticsActionEnum {
  CLEAR_REQUEST_OUTCOME = 'patientStatistics/CLEAR_REQUEST_OUTCOME',
  GET_PATIENT_STATISTICS_REQUESTED = 'patientStatistics/GET_PATIENT_STATISTICS_REQUESTED',
  GET_PATIENT_STATISTICS_ERROR = 'patientStatistics/GET_PATIENT_STATISTICS_ERROR',
  GET_PATIENT_STATISTICS_SUCCESS = 'patientStatistics/GET_PATIENT_STATISTICS_SUCCESS',
}

type PatientStatisticsAction =
  | { type: PatientStatisticsActionEnum.CLEAR_REQUEST_OUTCOME }
  | { type: PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_REQUESTED }
  | {
      type: PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_ERROR;
      payload: { message: string };
    }
  | {
      type: PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_SUCCESS;
      payload: { data: PatientStatistics };
    };

const getPatientStatsiticsRequested = (): PatientStatisticsAction => ({
  type: PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_REQUESTED,
});

export const getPatientStatistics = (
  patientId: string
): ((dispatch: Dispatch) => ServerRequestAction) => {
  return (dispatch: Dispatch) => {
    dispatch(getPatientStatsiticsRequested());

    return dispatch(
      serverRequestActionCreator({
        endpoint: `${EndpointEnum.PATIENTS}/${patientId}${EndpointEnum.STATISTICS}`,
        onSuccess: ({
          data,
        }: {
          data: PatientStatistics;
        }): PatientStatisticsAction => ({
          type: PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_SUCCESS,
          payload: { data },
        }),
        onError: (error: ServerError): PatientStatisticsAction => ({
          type: PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_ERROR,
          payload: { message: error.message },
        }),
      })
    );
  };
};

export const clearPatientStatisticsRequestOutcome = (): PatientStatisticsAction => ({
  type: PatientStatisticsActionEnum.CLEAR_REQUEST_OUTCOME,
});

export type PatientStatisticsState = {
  data: OrNull<PatientStatistics>;
  error: boolean;
  loading: boolean;
  message: OrNull<string>;
};

const initialState: PatientStatisticsState = {
  data: null,
  error: false,
  loading: false,
  message: null,
};

export const patientStatisticsReducer = (
  state = initialState,
  action: PatientStatisticsAction
): PatientStatisticsState => {
  switch (action.type) {
    case PatientStatisticsActionEnum.CLEAR_REQUEST_OUTCOME: {
      return { ...initialState, data: state.data };
    }
    case PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_REQUESTED: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_SUCCESS: {
      return {
        ...initialState,
        data: action.payload.data,
      };
    }
    case PatientStatisticsActionEnum.GET_PATIENT_STATISTICS_ERROR: {
      return {
        ...initialState,
        error: true,
        message: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
};
