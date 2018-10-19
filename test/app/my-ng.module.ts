import {NgModule} from '@angular/core';
import {ArcModule} from '../../src';
import {MyNgAComponent} from './my-ng-a.component';
import {MyNgBComponent} from './my-ng-b.component';

@NgModule({
    imports: [
        ArcModule,
    ],
    exports: [
        MyNgAComponent,
        MyNgBComponent,
    ],
    declarations: [
        MyNgAComponent,
        MyNgBComponent,
    ],
})
export class MyNgModule {
}