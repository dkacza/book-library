import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import {useParams} from 'react-router-dom';

const BookDetailsView = () => {
  const {id} = useParams();

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>{id}</Title>
        <section>details</section>
      </main>
    </MainViewTemplate>
  );
};
export default BookDetailsView;