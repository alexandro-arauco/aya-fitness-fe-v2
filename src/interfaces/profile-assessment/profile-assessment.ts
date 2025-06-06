export interface AssessmentsResponse {
  id: number;
  exercises: string;
  trainer_name: string;
  created_at: string;
}

export interface ExercisesResponse {
  id: number;
  name: string;
  body_part: string;
}

export interface RegressionResponse {
  left: DataSide;
  right: DataSide;
}

export interface DataSide {
  data: ItemDataSide[];
  weightImpulse: WeightImpulse;
}

export interface ItemDataSide {
  weight: number;
  percentageBW: number;
  force: number;
  ttp: number;
  rofd: number;
  impulse: number;
  acceleration: number;
  graphic: GraphicItemDataSide[];
  metric: string;
}

interface GraphicItemDataSide {
  smoothed: number;
  time: number;
}

interface WeightImpulse {
  estimate: number;
  intercept: number;
  slope: number;
  weight: number;
  percentageBW: number;
  metric: string;
}
