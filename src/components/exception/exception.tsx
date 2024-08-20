import {
  ComponentProps,
  FC,
  ReactElement,
  ReactNode,
  isValidElement,
  useMemo,
} from 'react';
import errorImage from './error.svg';

export interface ExceptionProps {
  image?: ReactElement | string;

  action?: ReactNode;

  title: ReactNode;

  description?: ReactNode;
}

export const ExceptionImage: FC<ComponentProps<'img'>> = (props) => {
  return (
    <img
      className="float-right w-full max-w-[430px] h-96 object-contain object-center"
      src={errorImage}
      alt=""
      {...props}
    />
  );
};

export const Exception: FC<ExceptionProps> = (props) => {
  const img = useMemo(() => {
    if (typeof props.image === 'string') {
      return <ExceptionImage src={props.image} />;
    }

    if (isValidElement(props.image)) {
      return props.image;
    }

    return <ExceptionImage />;
  }, [props.image]);

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center min-h-[500px] h-full">
        <div className="flex-[1_1_62.5%] pr-[6%] box-border">{img}</div>
        <div className="flex-[1_1_37.5%] pr-12">
          <h1 className="mb-6 text-gray-800 font-semibold text-4xl">
            {props.title}
          </h1>
          <div className="mb-4 text-gray-700 text-lg font-normal">
            {props.description}
          </div>
          {props.action && <div>{props.action}</div>}
        </div>
      </div>
    </div>
  );
};
