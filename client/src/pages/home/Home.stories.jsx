import React from 'react';
import { Home } from './Home';

export default {
  title: 'Pages/Home',
  component: Home
};

const Template = (args) => <Home {...args}/>;

export const HomeStory = Template.bind({});
HomeStory.args = {
  posts: [
    {
      description: 'This is a picture of the forest near my house',
      imageUrl: 'https://decentralized-mvp.s3.amazonaws.com/blog/post-photo-1.jpg',
      user: '0xBB1f2233551FbfD2A534be15a1A03c57CAF28eF7',
      id: 0
    },
    {
      description: 'This is a picture of the forest near my house',
      imageUrl: 'https://decentralized-mvp.s3.amazonaws.com/blog/post-photo-1.jpg',
      user: '0xBB1f2233551FbfD2A534be15a1A03c57CAF28eF7',
      id: 1
    }
  ]
};