import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";




const RechercheBis = () => {

    const api = "http://localhost:8088/books-title/";

    const[books, setBooks] = useState([]);

   const{new_mot}= useParams();

   

        const getBooks = async () => {
        const {data} = await axios.get(api+new_mot); 
        setBooks(data);
    }

        useEffect(() => {
                    getBooks();
                }, [])



return (

    <div className="App">
     <div id="zone-texte-2-3-result"> <span><h2> Voici le résultat de votre recherche </h2></span>
        <div className="zone-texte-2-3-container"> 
            <div> 
            <div className="row m-3 zone-book">
                    {
                        books.map(b => 
                        
                                <div key={b.id} className="col-md-2 card-book-research">
                                    <img className="card-im-research" src={b.picUrl} alt=""/>
                                    <h6> {b.title} </h6>
                                </div>
                        
                            
                            )
                    }
             </div>
            </div>
        </div>
   </div>
   </div>
)
}

export default RechercheBis;
