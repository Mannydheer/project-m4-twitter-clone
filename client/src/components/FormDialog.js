import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import { COLORS } from '../constants';
import { TweetHomeContext } from './TweetHomeContext';





export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    //on change inserting updated tweet inside
    const [tweet, setTweet] = useState('');
    const { handlePost } = React.useContext(TweetHomeContext);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false)

    }
    const handleClose = () => {
        setOpen(false)
        postHandler();
    }


    const postHandler = async () => {

        const data = {
            status: tweet
        }
        //do a post to the database
        if (tweet !== '') {
            try {
                let response = await fetch(`/api/tweet`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                let post = await response.json();
                //only refetch if post has something... if post is successful. and response is 200
                if (response.status === 200 && post) {
                    console.log('inside post')
                    //get all the feed again after the post and send it back to the context to update and state and re-render the feed. 
                    try {
                        let fetchTweets = await fetch('api/me/home-feed')
                        let allTweets = await fetchTweets.json()
                        handlePost(allTweets)
                    }
                    catch (err) {
                        throw Error('ERROR WHEN POSTING')
                    }
                }
            }
            //if the whole post fails. 
            catch (error) {
                throw Error('POST UNSUCCESSFUL')
            }
        }


    };

    return (
        <div>

            <Btn onClick={handleClickOpen}>
                Meow

      </Btn>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Tweet Something</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Whats happening...?
          </DialogContentText>
                    <TextField
                        autoFocus

                        margin="dense"
                        id="name"
                        label="Tweet"
                        fullWidth
                        onChange={e => setTweet(e.target.value)}

                    />
                </DialogContent>
                <DialogActions>
                    <MyButton onClick={handleCancel}>
                        Cancel
          </MyButton>
                    <MyButton onClick={handleClose}>
                        Tweet
          </MyButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const MyButton = styled(Button)({
    backgroundColor: 'white',
    border: 0,
    borderRadius: 3,
    height: 48,
    padding: '0 30px',
});

const Btn = styled.button`

font-size: 24px;
outline: none;
border-radius: 25px;
padding: 10px;
margin: 10px;
background-color: rgb(53,161,241);
color: white;


&:hover {
    opacity: 0.7;
    transition: 0.3s all;
    cursor: pointer;

}
`