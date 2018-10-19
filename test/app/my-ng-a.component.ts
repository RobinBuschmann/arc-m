import {Component} from '@angular/core';
import {registerReactComponents} from '../../src';
import {HelloWorld} from './hello-world';

const [helloWorld] = registerReactComponents([HelloWorld]);

@Component({
    selector: 'my-ng-a',
    template: `
    <div>
        ${helloWorld(`<ARC [name]="name" (onClick)="handleOnClick($event)"></ARC>`)}
    </div>
  `,
})
export class MyNgAComponent {
    name = 'you';

    handleOnClick(value) {
    }
}