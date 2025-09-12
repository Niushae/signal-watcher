import React from 'react';

type Props = React.ComponentPropsWithoutRef<'button'>

export default function BaseButton({className, ...props}: Props) {
  const finalClassName = [
    'font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...props} className={finalClassName} />);
}