import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const params = useParams();
    let noteId = params.id;
    let [note, setNote] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getNote()
    }, [noteId])

    const getNote = async () => {
        if (noteId === 'new') {
            return false;
        }
        let api_call = await fetch(`/api/notes/${noteId}/`);
        let api_response = await api_call.json();
        setNote(api_response);
    }

    const createNote = async () => {
        fetch('/api/notes/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        });
    }

    const updateNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    const deleteNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate(-1);
    }

    const handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
    }

    const handleSubmit = () => {
        if (noteId !== 'new' && note.body === '') {
            deleteNote();
        } else if (noteId !== 'new') {
            updateNote();
            navigate(-1);
        } else if (noteId === 'new' && note.body !== null) {
            createNote();
            navigate(-1);
        }
    }

    return (
        <>
            <div className='note'>
                <div className='note-header'>
                    <h3>
                        <ArrowLeft onClick={handleSubmit} />
                    </h3>
                    {noteId !== 'new' ? (<button onClick={deleteNote}>Delete</button>) : (<button onClick={handleSubmit}>Done</button>)}
                </div>
                <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
            </div>
        </>
    )
}

export default NotePage
