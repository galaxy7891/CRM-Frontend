import React from 'react';
import Landing from './partials/landing';
import Platform from './partials/platform';
import PreviewCrm from './partials/preview-crm';
import Price from './partials/price';
import Faq from './partials/faq';
import Testimonial from './partials/testimonial';

const Home = () => {
  return (
    <div>
      <Landing />
      <Platform />
      <PreviewCrm />
      <Price />
      <Faq />
      <Testimonial />
    </div>
  );
};

export default Home;
