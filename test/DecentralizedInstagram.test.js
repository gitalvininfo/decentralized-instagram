const DecentralizedInstagram = artifacts.require('./DecentralizedInstagram.sol');
const truffleAssert = require('truffle-assert');

contract('DecentralizedInstagram', (accounts) => {
  let decentralizedInstagram;

  before(async () => {
    decentralizedInstagram = await DecentralizedInstagram.deployed()
  });

  describe('createPost', () => {
    it('should add the post to the blockchain', async () => {
      const mockHash = 'some_hash';
      const mockText = 'Hello world';
      await decentralizedInstagram.createPost(mockHash, mockText);

      const newlyAddedPost = await decentralizedInstagram.posts(0);
      assert.equal(newlyAddedPost.id, 0);
      assert.equal(newlyAddedPost.text, mockText);
      assert.equal(newlyAddedPost.ipfsHash, mockHash);
      assert.equal(newlyAddedPost.user, accounts[0]);
    });

    it('should increment the post id', async () => {
      const nextPostId = await decentralizedInstagram.nextPostId();
      assert.equal(parseInt(nextPostId.toString()), 1);
    });

    it('should emit an event containing the metadata for a post', async () => {
      const mockHash = 'some_hash';
      const mockText = 'Hello world';
      const tx = await decentralizedInstagram.createPost(mockHash, mockText);
    
      truffleAssert.eventEmitted(tx, 'PostCreated', async event => {
        const { text }  = event;
        return (
          text === mockText
        );
      });
    });
  });

  describe('getPosts', () => {
    it('should return a list of all posts', async () => {
      const posts = await decentralizedInstagram.getPosts();
      assert.equal(posts.length, 2);
      assert.equal(parseInt(posts[0].id.toString()), 0);
      assert.equal(parseInt(posts[1].id.toString()), 1);
    });
  });
});