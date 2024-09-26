export interface CityStateCountModel {
  city: string;
  state: string;
  count: number;
}

export interface StateCountModel {
  state: string;
  count: number;
}

export interface cityResponseType {
  payload: CityStateCountModel[];
  maxCount: number;
}

export interface stateResponseType {
  payload: StateCountModel[];
  maxCount: number;
}
