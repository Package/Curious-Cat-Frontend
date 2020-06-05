import React, {useState} from 'react';
import Axios from "axios";
import {buildHeader} from "../auth";
import {FlashMessage} from "./FlashMessage";

export const ChangePhoto = () => {

    const [file, setFile] = useState(undefined);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (file == null) {
            fadeMessages('', 'Please select a photo to upload.');
            return false;
        }

        let formData = new FormData();
        formData.append("profile_photo", file);

        Axios({
            method: "post",
            url: '/api/photo.php',
            headers: buildHeader(),
            data: formData
        }).then(res => fadeMessages(res.data.message, '')
        ).catch(err => fadeMessages('', err.response.data.message));
    }

    const removePhoto = (e) => {
        Axios({
            method: "delete",
            url: '/api/photo.php',
            headers: buildHeader()
        }).then(res => fadeMessages(res.data.message, '')
        ).catch(err => fadeMessages('', err.response.data.message));
    }

    const fadeMessages = (success, error) => {
        setSuccess(success);
        setError(error);

        setTimeout(() => {
            setSuccess('')
            setError('')
        }, 3000)
    }

    return (
        <div>
            <h2>Profile Photo</h2>

            <FlashMessage message={success} type="success"/>
            <FlashMessage message={error} type="error"/>

            <form onSubmit={onSubmit}>
                <div className="panel">
                    <div className="form-group">
                        <input type="file" id="profilePhoto" aria-describedby="profilePhotoHelp"
                               placeholder="Select Photo" onChange={(e) => setFile(e.target.files[0])}/>
                        <small id="profilePhotoHelp" className="form-text text-muted">Select a photo to be shown around
                            the website.</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Set Picture</button>
                </div>
            </form>

            <p>
                <button className="btn btn-outline-danger btn-sm" onClick={removePhoto}>Remove Photo</button>
            </p>
        </div>
    );
};
