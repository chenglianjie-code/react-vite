import clsx from 'clsx';
import {
  ComponentProps,
  DetailedHTMLProps,
  FC,
  ImgHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

export const Logo: FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
  return (
    <div className="flex w-6 h-6 items-center">
      <img
        {...props}
        className={clsx('w-full h-full object-contain', props.className)}
        alt=""
      />
    </div>
  );
};

export const BrandName: FC<ComponentProps<'div'>> = (props) => {
  return (
    <div {...props} className={clsx('text-xl font-normal', props.className)}>
      {props.children}
    </div>
  );
};

export interface BrandProps {
  logo?: ReactNode;
  small?: boolean;
}

export const Brand: FC<PropsWithChildren<BrandProps>> = (props) => {
  return (
    <div className="flex items-center">
      <div className="flex-none">{props.logo}</div>
      <BrandName
        className={clsx(
          'ml-2 transition-all duration-200',
          props.small ? 'opacity-0' : 'opacity-100',
        )}
      >
        {props.children}
      </BrandName>
    </div>
  );
};
