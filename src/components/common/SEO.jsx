import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const BASE_URL = 'https://skill100.ai';

const SEO = ({
  title = 'skill100.ai | Master the Art of Learning',
  description = 'Unlock your potential with skill100.ai. Explore resources for Learning to Learn, Mathematics, and Artificial Intelligence.',
  name = '@skill100ai',
  type = 'website',
  canonical = null,
  image = null,
  keywords = null,
  url = null,
  structuredData = null,
}) => {
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : null;
  const fullUrl = url || fullCanonical || BASE_URL;
  const ogImage = image || `${BASE_URL}/logo.jpg`;
  const twitterCard = image ? 'summary_large_image' : 'summary';
  const ogType = type || 'website';
  const twitterCreator = name || '@skill100ai';

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="skill100.ai" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@skill100ai" />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
  url: PropTypes.string,
  structuredData: PropTypes.object,
};

SEO.defaultProps = {
  title: 'skill100.ai | Master the Art of Learning',
  description: 'Unlock your potential with skill100.ai. Explore resources for Learning to Learn, Mathematics, and Artificial Intelligence.',
  name: '@skill100ai',
  type: 'website',
  canonical: null,
  image: null,
  keywords: null,
  url: null,
  structuredData: null,
};

export default SEO;
