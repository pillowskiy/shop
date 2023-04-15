import type { FC, HTMLAttributes } from 'react';
import classNames from 'clsx';
import { Anchor } from '@/components/ui';

interface QuerySuggestProps extends HTMLAttributes<HTMLDivElement> {}

export const QuerySuggest: FC<QuerySuggestProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={classNames(className)} {...props}>
      <div className="mt-2">
        <p className="float-left text-xs text-black opacity-50">
          Search history
        </p>
        <Anchor className="float-right">Clear history</Anchor>

        <ul className="mt-2 text-sm text-black opacity-70">
          <li className="mt-2 w-max">
            <i className="material-icons-round opacity-30">search</i>
            <p className="float-right ml-1 mt-0.5">123</p>
          </li>
          <li className="mt-2 w-max">
            <i className="material-icons-round opacity-30">search</i>
            <p className="float-right ml-1 mt-0.5">u1</p>
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <p className="text-xs text-black opacity-50">Search by category</p>

        <ul className="text-sm text-black opacity-70">
          <li className="mt-2 w-max">
            <i className="material-icons-round opacity-30">search</i>
            <p className="float-right ml-1 mt-0.5">in category Computers</p>
          </li>
          <li className="mt-2 w-max">
            <i className="material-icons-round opacity-30">search</i>
            <p className="float-right ml-1 mt-0.5">in category Software</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
