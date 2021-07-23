/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';

const { Consumer, Provider } = React.createContext({} as any);

export const withDependencies =
  (dependencyMap: any) => (Component: any) => (props: any) =>
    (
      <Consumer>
        {(container) => {
          const depProps = Object.keys(dependencyMap).reduce(
            (depObj, key) => ({
              ...depObj,
              [key]: container.get(dependencyMap[key]),
            }),
            {},
          );

          return <Component {...depProps} {...props} />;
        }}
      </Consumer>
    );

export const DependencyProvider = Provider;
