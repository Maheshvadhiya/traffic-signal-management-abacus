export type SignalColor = 'red' | 'yellow' | 'green';

export interface DirectionState {
  label: string;
  signal: SignalColor;
  countdown: number;
}