import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';

const BookDetailsView = () => {
  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Book details</Title>
        <section>details</section>
      </main>
    </MainViewTemplate>
  );
};
export default BookDetailsView;