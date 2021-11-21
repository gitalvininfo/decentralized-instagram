import React from 'react';
import Post from './Post';

export default {
  title: 'Components/Post',
  component: Post
};

const Template = (args) => <Post {...args}/>;

export const PostStory = Template.bind({});
PostStory.args = {
  description: 'This is a picture of the forest near my house',
  imageUrl: 'https://decentralized-mvp.s3.amazonaws.com/blog/post-photo-1.jpg',
  user: '0xBB1f2233551FbfD2A534be15a1A03c57CAF28eF7'
};