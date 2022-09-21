import { useEffect, useRef } from 'react';

interface FromTo {
  from: any;
  to: any;
}

type Changes = Record<string, FromTo>;

type GenericProps = Record<string, any>;

export const useWhyDidYouUpdate = (name: string, props: GenericProps) => {
  const previousProps = useRef<GenericProps>();

  useEffect(() => {
    if (previousProps?.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changes: Changes = {};

      allKeys.forEach((key) => {
        if (previousProps.current?.[key] !== props[key]) {
          changes[key] = {
            from: previousProps.current?.[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changes).length) {
        // eslint-disable-next-line no-console
        console.log('[why-did-you-update]', name, changes);
      }
    }

    previousProps.current = props;
  });
};
