import {createComponent} from './arc-factory';

type ReactComponent = [object, string] | object;
type Options = { placeholder?: string, selectorPrefix?: string };

let keyCount = 0;
const createUniqueSelector = prefix => prefix + (keyCount++);

const angularComponents = [] as any;
const container = new Map();
const defaultOptions = {placeholder: 'ARC', selectorPrefix: 'react-component-'};

export const moduleConfig = {exports: angularComponents, declarations: angularComponents};

export const registerReactComponents = (componentsWithOWithoutSelector: ReactComponent[],
                                        options: Options = {}) => {
  const {placeholder, selectorPrefix} = {...defaultOptions, ...options};
  return componentsWithOWithoutSelector
    .map(value => Array.isArray(value) ? value : [value, undefined])
    .map(([reactComponent, selector]) => {
      if (!container.has(reactComponent)) {

        selector = selector || createUniqueSelector(selectorPrefix);
        const angularReactComponent = createComponent(reactComponent, selector);
        angularComponents.push(angularReactComponent);

        container.set(reactComponent, selector);
      }
      const retrievedSelector = container.get(reactComponent);
      if (selector && retrievedSelector !== selector) {
        throw new Error(`The react component you're trying to register with "${selector}" ` +
          `is already registered with selector "${retrievedSelector}"`);
      }
      return retrievedSelector;
    })
    .map(selector => (template: string) => template.replace(new RegExp(placeholder, 'g'), selector))
};
