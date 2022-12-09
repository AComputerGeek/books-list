// @author: Amir Armion
// @version: V.01

import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
  books: [],
  addBook: (bookName) =>
    set(
      produce((state) => {
        state.books.push({
          id: Math.floor(Math.random() * 100),
          name: bookName,
          isRead: false
        });
      })
    ),
  removeBook: (bookId) =>
    set(
      produce((state) => {
        const bookIndex = state.books.findIndex((book) => book.id === bookId);
        state.books.splice(bookIndex, 1);
      })
    ),
  updateBook: (newBook) =>
    set(
      produce((state) => {
        const book = state.books.find((book) => book.id === newBook.id);
        book.name = newBook.name;
      })
    ),
  setRead: (bookId) =>
    set(
      produce((state) => {
        const bookIndex = state.books.findIndex((book) => book.id === bookId);
        state.books[bookIndex].isRead = !state.books[bookIndex].isRead;
      })
    )
}));
