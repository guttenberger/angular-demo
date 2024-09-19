import { ResolveFn } from '@angular/router';

export const leadResolver: ResolveFn<boolean> = (route, state) => {
  return !!route && !!state;
};
