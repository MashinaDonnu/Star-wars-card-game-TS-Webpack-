import { rootReducer } from 'common/store/root-reducer';

export class Store {
  private readonly _state;
  private readonly _rootReducer: Function;
  private listeners: Function[] = [];
  constructor(reducer: Function, initialState = {}) {
    this._rootReducer = reducer;
    this._state = { ...initialState };
  }

  subscribe(callback: (state: ReturnType<this['getState']>) => void): { unsubscribe: Function } {
    this.listeners.push(callback);
    return {
      unsubscribe: () => this.listeners.filter((cb) => cb !== callback),
    };
  }

  dispatch(action: string) {
    const updatedState = this._rootReducer(this._state, action);
    this.listeners.forEach((callback) => {
      callback(updatedState);
    });
  }

  getState(): typeof this._state {
    return this._state;
  }
}
