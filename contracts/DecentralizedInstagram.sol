// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DecentralizedInstagram {

    Post[] public posts;
    uint public nextPostId = 0;


    struct Post {
        uint id;
        string ipfsHash;
        string text;
        address user;
    }

    event PostCreated(
        uint id,
        string ipfsHash,
        string text,
        address user
    );



    function createPost(string memory ipfsHash, string memory text) public {
        address user = msg.sender;

        Post memory newPost = Post(nextPostId, ipfsHash, text, user);
        posts.push(newPost);

        nextPostId += 1;

        emit PostCreated(nextPostId - 1, ipfsHash, text, user);

    }

    function getPosts() external view returns(Post[] memory) {
        return posts;
    }
}