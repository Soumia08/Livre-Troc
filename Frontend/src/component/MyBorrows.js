import React, {useState} from 'react'
import Book from './Book'
import '../styles/MyBorrows.scss'
import axios from 'axios';
export default function MyBorrows(){

    const [myBorrows, setMyBorrows] = React.useState([]);
    const getMyBorrows = () => {
        axios.get('/borrows').then(response => {
            setMyBorrows(response.data)
           })
    }

    React.useEffect(()=> {
        getMyBorrows();
    },[])
   

    const closeBorrow = (borrowId) => {
        axios.delete(`/borrows/${borrowId}`).then(response => {
            getMyBorrows();
           })
    }

    
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };


  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(myBorrows.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const renderItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
return myBorrows.slice(startIndex, endIndex).map((item) => (
  
  <div key= {item.id} className="borrow-container">
                            <Book
                                title={item.book.title}
                                category={item.book.category.label}
                                picUrl={item.book.picUrl}
                                lender={item.lender.firstName + " " + item.lender.lastName}
                                askDate={item.askDate}
                                closeDate={item.closeDate}>
                            </Book>
                            
                                {item.closeDate ? "" : <button class="btn btn-outline-dark" onClick={() => closeBorrow(item.id)}>Close</button>}
                           
                        </div>
));
};



    return (
        <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2 className="text-center mb-4"> Mes emprunts </h2>
           
            {renderItems()}
            {myBorrows.length === 0 ? <div>Vous n'avez pas d'emprunt</div> : null}
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