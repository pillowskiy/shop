import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FC, PropsWithChildren } from 'react';

interface IProps {
  title: string;
  description?: string;
  image?: string;
}

export const titleMerge = (title: string) => `${title} | Shop`;

const Meta: FC<PropsWithChildren<IProps>> = ({
  children,
  image,
  title,
  description,
}: PropsWithChildren<IProps>) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}`;

  return (
    <>
      <Head>
        <title itemProp="headline">{titleMerge(title)}</title>
        {description ? (
          <>
            <meta
              itemProp="description"
              name="description"
              content={description}
            />
            <link rel="canonical" href={currentUrl} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:locale" content="en" />
            <meta property="og:title" content={titleMerge(title)} />
            <meta property="og:image" content={image || 'logo.svg'} />
            <meta property="og:description" content={description} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow"/>
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;