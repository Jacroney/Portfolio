import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Joe Croney';
const SITE_URL = 'https://josephcroney.com';
const DEFAULT_DESCRIPTION =
  'Joe Croney — Computer Science student at Cal Poly SLO, focused on AI, machine learning, and systems programming.';
const DEFAULT_IMAGE = `${SITE_URL}/og.png`;

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
}: SeoProps) => {
  const fullTitle = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default Seo;
