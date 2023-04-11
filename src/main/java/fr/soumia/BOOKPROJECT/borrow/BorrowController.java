package fr.soumia.BOOKPROJECT.borrow;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fr.soumia.BOOKPROJECT.Book.Book;
import fr.soumia.BOOKPROJECT.Book.BookController;
import fr.soumia.BOOKPROJECT.Book.BookRepository;
import fr.soumia.BOOKPROJECT.Book.BookStatus;
import fr.soumia.BOOKPROJECT.user.UserInfo;
import fr.soumia.BOOKPROJECT.user.UserRepository;


import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@SecurityRequirement(name = "bearerAuth")
public class BorrowController {

    @Autowired
    BorrowRepository borrowRepository;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    BookController bookController;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value ="/borrows")
    public ResponseEntity list(Principal principal) {
        List<Borrow> borrows = borrowRepository.findByBorrowerId(bookController.getUserConnectedId(principal));
        return new ResponseEntity(borrows, HttpStatus.OK);
    }

    @PostMapping("/borrows/{bookId}")
    public ResponseEntity create(@PathVariable("bookId") String bookId, Principal principal) {
        Integer userConnectedId = bookController.getUserConnectedId(principal);
        Optional<UserInfo> borrower = userRepository.findById(userConnectedId);
        Optional<Book> book = bookRepository.findById(Integer.valueOf(bookId));

        if(borrower.isPresent() && book.isPresent() && book.get().getBookStatus().equals(BookStatus.FREE)) {
            Borrow borrow = new Borrow();
            Book bookEntity = book.get();
            borrow.setBook(bookEntity);
            borrow.setBorrower(borrower.get());
            borrow.setLender(bookEntity.getUser());
            borrow.setAskDate(LocalDate.now());
            borrowRepository.save(borrow);

            bookEntity.setBookStatus(BookStatus.BORROWED);
            bookRepository.save(bookEntity);
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/borrows/{borrowId}")
    public ResponseEntity delete(@PathVariable("borrowId") String borrowId) {

        Optional<Borrow> borrow = borrowRepository.findById(Integer.valueOf(borrowId));
        if(borrow.isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        Borrow borrowEntity = borrow.get();
        borrowEntity.setCloseDate(LocalDate.now());
        borrowRepository.save(borrowEntity);

        Book book = borrowEntity.getBook();
        book.setBookStatus(BookStatus.FREE);
        bookRepository.save(book);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
