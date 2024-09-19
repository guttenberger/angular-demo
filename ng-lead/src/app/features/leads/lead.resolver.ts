import { ResolveFn } from '@angular/router';

export const LeadResolver: ResolveFn<boolean> = (route, state) => {
  return !!route && !!state;
};
