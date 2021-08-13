// import the required animation functions from the angular animations module
import { trigger, query, animate, transition, style } from '@angular/animations';
import { Optional } from '@angular/core';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave',[
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ],{ optional: true }),
      // Animate the new page in
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ],{ optional: true })
    ]),
]);
