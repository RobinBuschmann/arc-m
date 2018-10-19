import {TestBed, async} from '@angular/core/testing';
import {MyNgModule} from '../app/my-ng.module';
import {MyNgAComponent} from '../app/my-ng-a.component';
import {MyNgBComponent} from '../app/my-ng-b.component';

describe('arc-m', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MyNgModule],
        }).compileComponents();
    }));

    describe('registerReactComponents using reference', () => {

        it('should create app', async(() => {
            const fixture = TestBed.createComponent(MyNgAComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }));

        it('should pass ng-input down to react component', async(() => {
            const fixture = TestBed.createComponent(MyNgAComponent);
            fixture.detectChanges();
            const myNgAComponent = fixture.componentInstance;
            expect(fixture.nativeElement.querySelector('p').innerHTML)
                .toEqual('Hello ' + myNgAComponent.name)
        }));

        it('should trigger ng-event from inside of react component', async(() => {
            const fixture = TestBed.createComponent(MyNgAComponent);
            fixture.detectChanges();
            const handleOnClickSpy = jest.spyOn(MyNgAComponent.prototype, 'handleOnClick');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(handleOnClickSpy).toHaveBeenCalledWith('from react');
        }));

    });

    describe('registerReactComponents using custom selector', () => {

        it('should create app', async(() => {
            const fixture = TestBed.createComponent(MyNgBComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }));

        it('should pass ng-input down to react component', async(() => {
            const fixture = TestBed.createComponent(MyNgBComponent);
            fixture.detectChanges();
            const myNgAComponent = fixture.componentInstance;
            expect(fixture.nativeElement.querySelector('p').innerHTML)
                .toEqual(myNgAComponent.info)
        }));

        it('should trigger ng-event from inside of react component', async(() => {
            const fixture = TestBed.createComponent(MyNgBComponent);
            fixture.detectChanges();
            const handleOnClickSpy = jest.spyOn(MyNgBComponent.prototype, 'handleOnClick');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            expect(handleOnClickSpy).toHaveBeenCalledWith('from react');
        }));

    });

});