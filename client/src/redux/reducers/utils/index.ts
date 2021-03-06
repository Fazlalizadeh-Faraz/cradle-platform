import { Method as AxiosMethod } from 'axios';
import { Callback } from 'src/types';
import { MethodEnum } from 'src/server';

export enum MakeServerRequestEnum {
  MAKE_SERVER_REQUEST = 'MAKE_SERVER_REQUEST',
}

interface IServerRequestActionCreatorArgs<
  TOnSuccess = Callback<any, any>,
  TOnError = Callback<any, any>,
  TData = any
> {
  endpoint: string;
  onSuccess: TOnSuccess;
  onError: TOnError;
  data?: TData;
  method?: AxiosMethod;
}

export type ServerRequestAction = {
  type: MakeServerRequestEnum;
  payload: IServerRequestActionCreatorArgs;
};

export type ServerRequestActionCreator = Callback<
  IServerRequestActionCreatorArgs,
  ServerRequestAction
>;

export const serverRequestActionCreator: ServerRequestActionCreator = ({
  endpoint,
  onSuccess,
  onError,
  data = null,
  method = MethodEnum.GET,
}) => {
  return {
    type: MakeServerRequestEnum.MAKE_SERVER_REQUEST,
    payload: {
      endpoint,
      method,
      data,
      onSuccess,
      onError,
    },
  };
};
