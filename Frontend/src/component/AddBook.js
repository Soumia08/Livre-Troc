import React from 'react'
import {  useEffect , useState} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom"

import "../styles/AddBook.scss"
export default function AddBook(){

    const history = useNavigate();

    let {bookId} = useParams();
    const [bookData, setBookData] = useState({
        title: '',
        author:'',
        categoryId: '',
        picUrl:''

    })
    const [categoriesData, setCategoriesData] = React.useState([]);


    useEffect(() => {
        axios.get('/categories').then(response => {
            setCategoriesData(response.data)
            setBookData({
                title: '',
                author:'',
                categoryId: response.data[0].id,
                picUrl:''
            })

        })
            .then(() => {
                if (bookId) {
                    axios.get(`/books/${bookId}`).then(response => {
                        setBookData({
                            title: response.data.title,
                            author:response.data.author,
                            categoryId: response.data.category.id,
                            picUrl:response.data.picUrl
                        })

                    })
                }

            })
    }, [bookId]);
   
    const handleChange = (event) => {
        let currentState = { ...bookData };
        currentState[event.target.name] = event.target.value;
        setBookData(currentState)
    }

   
    const onSubmit = (event) => {
        if (bookId) {
            event.preventDefault();
            axios.put(`/books/${bookId}`, {
                ...bookData
            }).then(() => {
                //rediriger vers myBooks
                history("/myBooks")
            })
        } else {
            event.preventDefault();
            axios.post('/books', {
                ...bookData
            }).then(() => {
                //rediriger vers myBooks
                history("/myBooks")
            })
        }
    }

    return (
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Ajouter un livre</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nom du livre</label>
                    <input name="title" type="text" value={bookData.title} onChange={handleChange} className="form-control"></input>
                </div>
                <div>
                    <label> Auteur</label>
                    <input name="author" type="text" value={bookData.author} onChange={handleChange} className="form-control"></input>
                </div>
                <div>
                    <label>Catégorie du livre</label>
                    <select name="categoryId" value={bookData.categoryId} onChange={handleChange} className="form-select">
                        {categoriesData.map(category => (
                            <option value={category.id} key={category.id}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label> Url Image </label>
                    <input name="picUrl" type="text" value={bookData.picUrl} onChange={handleChange} className="form-control"></input>
                </div>
                <div className="text-center" >
              <button type="submit" className="btn btn-primary mt-3" > Ajouter </button>
            </div>
            </form>
        </div>
        </div>
        </div>
    )
}