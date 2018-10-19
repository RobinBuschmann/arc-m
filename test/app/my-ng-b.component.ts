import {Component} from '@angular/core';
import {registerReactComponents} from '../../src';
import {Info} from './info';

registerReactComponents([[Info, 'info']]);

@Component({
    selector: 'my-ng-b',
    template: `
    <div>
        <info [value]="info" (onClick)="handleOnClick($event)"></info>
    </div>
  `,
})
export class MyNgBComponent {
    info = 'from my ng b component';

    handleOnClick(value) {
    }
}