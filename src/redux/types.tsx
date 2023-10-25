export interface RootState {
  popup: State;
}

export type State = {
  language: string;
  translateTerm: {
    previous: string;
    current: string;
  };
};
