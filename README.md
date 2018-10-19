# arc-m
> Angular React Component Module
> Angular module for wrapper react components in order to use those react components directly in angular components

## Installation
```bash
npm i arc-m
```

## Usage
1. Write a react component. Use `prop-types` to describe the component props.
```typescript jsx
import * as React from 'react';
import {string, func} from 'prop-types';

export const HelloWorld = ({name, onClick}) => (
    <div>
        <p>Hello {name}</p>
        <button onClick={onClick}>Click me!</button>
    </div>
);
HelloWorld.propTypes = {
  name: string,
  onClick: func,
};
```
2. Register the react component and just use it

    a. via reference
    ```typescript
    import {Component} from '@angular/core';
    import {registerReactComponents} from 'arc-m';
    import {HelloWorld} from './hello-world';
    
    const [helloWorld] = registerReactComponents([HelloWorld]);

    @Component({
       selector: 'my-ng-component',
       template: `
           <div>
               ${helloWorld(`<ARC [name]="name" (onClick)="handleOnClick"></ARC>`)}
           </div>
       `,
    })
    export class MyNgComponent {
        name = 'you';
        
        handleOnClick() {
            alert('👍');
        }
    }
    ```
`ARC` is just a placeholder for the actual component selector of `HelloWorld` and can be changed.
The selector of the angular component which wraps the react component is created dynamically.

    b. or with a custom selector
    ```typescript
    import {Component} from '@angular/core';
    import {registerReactComponents} from 'arc-m';
    import {HelloWorld} from './hello-world';
    
    registerReactComponents([[HelloWorld, 'hello-world']]);
    
    @Component({
      selector: 'my-ng-component',
      template: `
        <div>
            <hello-world [name]="name" (onClick)="handleOnClick"></hello-world>
        </div>
      `,
    })
    export class MyNgComponent {
        name = 'you';
        
        handleOnClick() {
            alert('👍');
        }
    }
    ```

3. Import arc module 
```typescript
import {NgModule} from '@angular/core';
import {ArcModule} from 'arc-m';
import {MyNgComponent} from './my-ng.component';

@NgModule({
  imports: [
    ArcModule,
  ],
  declarations: [
    MyNgComponent,
  ]
})
export class MyNgModule {
}
```

## `registerReactComponents` API

````typescript
registerReactComponents(
    Array<
        object |                // React component reference
        [
            object |            // React component reference
            string              // Custom selector for wrapping angular component
        ]
    >,
    {
        placeholder: string,    // @default: "ARC" Placeholder which gets overwritten when template function is called
        selectorPrefix: string, // @default: "react-component-" Prefix of dynamically created selector of angular component
    }
)
```` 