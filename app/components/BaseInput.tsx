import React from 'react';

type Props = React.ComponentPropsWithoutRef<'input'>;

export default function BaseInput(props: Props) {
  return (
    <input
      {...props}
      className="mt-1 py-3 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
  );
}