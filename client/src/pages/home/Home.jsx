import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5'
import Post from '../../components/post/Post';
import CreatePostForm from '../../components/create-post-form/CreatePostForm';
import { create } from 'ipfs-http-client';

import './Home.css';

export function Home({
  fileName,
  onChange,
  onSubmit,
  posts,
  postTextValue
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="home">
      <OpenModalBox
        onOpen={() => setModalIsOpen(true)}
      />
      {posts.map(post => (
        <Post
          key={post.id}
          description={post.text}
          imageUrl={`https://ipfs.infura.io/ipfs/${post.ipfsHash}`}
          user={post.user}
        />
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            borderRadius: '25px',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }
        }}
      >
        <div className="close-modal-button-container">
          <IoClose onClick={() => setModalIsOpen(false)} />
        </div>
        <CreatePostForm
          fileName={fileName}
          onChange={onChange}
          onSubmit={onSubmit}
          postTextValue={postTextValue}
        />
      </Modal>
    </div>
  )
}

function OpenModalBox({
  onOpen
}) {
  return (
    <div className="open-modal-box">
      <h2>Create Post</h2>
      <button className="app-button app-button-primary" onClick={onOpen}>Open Modal</button>
    </div>
  );
}

/**
 * @TODO Implement fetching of posts from back-end
 * @TODO Implement uploading posts
 */
export function HomeWrapper({
  account,
  decentralizedInstagram
}) {
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({ 'file-upload': '', 'post-text-input': '' });

  const client = create('https://ipfs.infura.io:5001/api/v0');

  useEffect(() => {
    (async function () {
      setupPostCreatedListener();

      const loadedPosts = await decentralizedInstagram.methods.getPosts().call();
      console.log('###', loadedPosts)
      setPosts(loadedPosts.reverse());
    })();
  }, []);

  function onChange(event) {
    const target = event.target;
    const isFileInput = target.files !== undefined;
    const newValue = isFileInput ? target.files[0] : target.value;

    setPostForm(previousState => ({ ...previousState, [target.name]: newValue }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    const file = postForm['file-upload'];
    const text = postForm['post-text-input'];

    const added = await client.add(file);

    await decentralizedInstagram.methods.createPost(added.path, text).send({ from: account });
    console.log('postForm values', postForm);
  }

  function setupPostCreatedListener() {
    decentralizedInstagram.events.PostCreated({}, (error, contractEvent) => {
      console.warn(contractEvent)
      const { ipfsHash, text, id, user } = contractEvent.returnValues;
      setPosts(previousState => [{ ipfsHash, text, id, user }, ...previousState]);
    })
  }

  return (
    <Home
      fileName={postForm['file-upload'] ? postForm['file-upload'].name : null}
      onChange={onChange}
      onSubmit={onSubmit}
      posts={posts}
      postTextValue={postForm['post-text-input']}
    />
  )
}