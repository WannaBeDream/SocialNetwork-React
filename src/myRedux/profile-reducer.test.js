import profileReducer, {addPost} from "./profile-reducer";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let state = {
    posts:
        [
            { id: 0, message: 'Hi, how are you?', likesCount: 12 },
            { id: 1, message: 'It\'s my first post', likesCount: 11 },
            { id: 2, message: 'Blabla', likesCount: 11 },
            { id: 3, message: 'Dada', likesCount: 11 }
        ]
};



it('length of posts should be incremented', () => {
    let action = addPost("You aren't Nigga, you're pussy!");
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
    let action = addPost("You aren't Nigga, you're pussy!");
    let newState = profileReducer(state, action);

    expect(newState.posts[4].message).toBe("You aren't Nigga, you're pussy!");
});




