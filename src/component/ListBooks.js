import React , {useState } from 'react'
import Book from './Book'
import axios from 'axios';
import '../styles/MyBooks.scss'
import '../styles/ListBooks.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";

 function ListBooks () {

  const history = useNavigate();
  const[books, setBooks] = useState([]) ;

  const fetchBooks= () => { 
      axios.get('/books?status=FREE').then(response => {
        setBooks(response.data)
     
    })
  }

  React.useEffect(() => {
    fetchBooks();
  }, [])


  
const handleBorrowBook = (bookId) => {
  axios.post(`/borrows/${bookId}`, {}).then(()=> {
    history('/myBorrows')
  })
}




  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };


  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(books.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const renderItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
  return books.slice(startIndex, endIndex).map((item) => (
      
      <div  key={item.id} className="container">
        <div  className="list-book-container">
        <Book title={item.title} author={item.author} category={item.category.label}   picUrl={item.picUrl} lender={`${item.user.firstName} ${item.user.lastName}`}></Book>
        <div className="text-center">
        <button class="btn btn-outline-secondary" onClick={() => handleBorrowBook(item.id)}>Emprunter</button>
        </div>
        </div>
      </div>
    ));
};






        
return (
        <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2 className="text-center mb-4"> Livres disponibles </h2>
            {books.length === 0 ? "Pas de livres disponibles Pour votre recherche" : null}
            {renderItems()}
            <nav>
      <ul className="pagination justify-content-center">
        <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only"></span>
        </a>
      </li>
      {getPageNumbers().map((number) => (
        
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>

          <a href="#" className="page-link" id={number} onClick={handlePageChange}>{number}</a>
        </li>
      ))}
      <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only"></span>
      </a>
    </li>
      </ul>
      </nav>
      </div>
      </div>
          </div>

)
          }
    
 


export default ListBooks;


  // export default function (props) {
  //   const history = useNavigate();
  //   return <ListBooks {...props} history={history} />;
  // }