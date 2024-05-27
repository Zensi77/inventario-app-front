import { trigger, transition, style, animate } from '@angular/animations';

// Animación de desvanecimiento
export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
]);
