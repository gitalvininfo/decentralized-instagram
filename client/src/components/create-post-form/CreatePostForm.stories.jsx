import React from 'react';
import CreatePostForm from './CreatePostForm';

export default {
  title: 'Components/CreatePostForm',
  component: CreatePostForm
};

const Template = (args) => <CreatePostForm {...args}/>;

export const CreatePostFormStory = Template.bind({});
CreatePostFormStory.args = {
  onChange: undefined,
  onSubmit: event => event.preventDefault()
};