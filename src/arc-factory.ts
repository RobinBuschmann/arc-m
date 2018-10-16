import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Type} from '@angular/core';
import {render, unmountComponentAtNode} from 'react-dom';
import {createElement} from 'react';
import {func} from 'prop-types';

export const createComponent = (ReactComponent, selector): Type<any> => {
  @Component({selector, template: `<!--ReactComponent ${selector}-->`})
  class AngularReactComponent implements OnInit, OnDestroy {
    props = {};
    outputKeys: string[];
    [args: string]: any;

    constructor(private element: ElementRef) {
      this.initEventEmitters();
    }

    ngOnInit() {
      this.update();
    }

    ngOnDestroy() {
      unmountComponentAtNode(this.element.nativeElement);
    }

    initEventEmitters() {
      this.outputKeys.forEach(key => {
        const emitter = new EventEmitter();
        this[key] = emitter;
        this.props[key] = value => emitter.emit(value);
      });
    }

    update() {
      render(
        createElement(ReactComponent, this.props, null),
        this.element.nativeElement,
      )
    }
  }

  AngularReactComponent.prototype.outputKeys = [];

  Object.keys(ReactComponent.propTypes || {})
    .forEach(key => {
      if (func === ReactComponent.propTypes[key]) {
        Output()(AngularReactComponent.prototype, key);
        AngularReactComponent.prototype.outputKeys.push(key);
      } else {
        Input()(AngularReactComponent.prototype, key);
        Object.defineProperty(AngularReactComponent.prototype, key, {
          set(value) {
            this.props[key] = value;
            this.update();
          },
        })
      }
    });

  return AngularReactComponent
};
