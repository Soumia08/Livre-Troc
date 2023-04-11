import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
import Book from './Book'
import "../styles/MyBooks.scss"
import SimpleModal from '../SimpleModal'

export default function  MyBooks () {

      const [myBooks, setMyBooks] = React.useState([]);
      const [showModal, setShowModal] = React.useState(false)
      const history = useNavigate();
      
      const fetchBooks = () => {
        axios.get('/books').then(response => {
          setMyBooks(response.data)
        })
      }

      React.useEffect(() => {
        fetchBooks();
      }, [])


      const handleDelete = (bookId) => {
        axios.delete(`/books/${bookId}`).then(response => {
          fetchBooks();
        }).catch(error => {
          setShowModal(true)
        })
      }
      
      

      const handleCloseModal = () => {
        setShowModal(false)
      }


      

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };


  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(myBooks.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const renderItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
  return myBooks.slice(startIndex, endIndex).map((item) => (
      
      <div  key={item.id} className="container">
        <div  className="list-book-container">
        <Book title={item.title} author={item.author} category={item.category.label}   picUrl={item.picUrl} lender={`${item.user.firstName} ${item.user.lastName}`}></Book>
        <div className="text-center">
        
        
        <button className="btn btn-outline-success btn-sm" onClick={() =>history(`/addBook/${item.id}`)}> Modifier</button> 
        
        <button className="btn btn-outline-danger btn-sm"  onClick={() => handleDelete(item.id)}>Supprimer</button> 
        
        </div>   
        </div>
      </div>
    ));
};

  return  (
    <div className="container">
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h2 className="text-center mb-4"> Mes livres </h2>
        {myBooks.length === 0 ? "Vous n'avez pas déclaré de livre " : null}
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
      <button class="btn btn-outline-secondary" onClick={() => history(`/addBook`)}>Nouveau livre</button>

      <SimpleModal
            title={"Supression de livre impossible"}
            bodyTxt={"Livre en cours d'emprunt"}
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          ></SimpleModal>
      </div>
)

}
