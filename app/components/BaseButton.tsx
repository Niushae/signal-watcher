import React from 'react';

type Props = React.ComponentPropsWithoutRef<'button'>;

export default function BaseButton(props: Props) {
  return (
    <button
      {...props}
      className="font-bold py-2 px-4 rounded-lg transition-colors"
    />
  );
}