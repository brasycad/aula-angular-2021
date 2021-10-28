import { trigger, state, animate, style, transition, query } from '@angular/animations';



export const inOutAnimation =
    trigger('inOutAnimation',
        [
            transition(
                ':enter',
                [
                    style({ height: 0, opacity: 0 }),
                    animate('.4s ease-out', style({ height: '*', opacity: 1 }))
                ]
            ),
            transition(
                ':leave',
                [
                    style({ opacity: 1 }),
                    animate('.4s ease-in', style({ height: 0, opacity: 0 }))
                ]
            )
        ]
    )