import { deleteDialog, showError } from '../../../shared/lib/alerts';
import { booksService } from '../../../service/books.service';
import { modal } from '../modal/modal';

export const onDeleteBook = async (book) => {
  let result = false;
  await deleteDialog(async () => {
    await booksService.delete(book.id);
    const bookCard = document.getElementById(book.id);
    bookCard.remove();
    const modal = document.querySelector('.modal')
    modal.remove()
    result = true;
  });

  return result;
};

export const onCardFavoriteToggle = async (bookInfoBeforeCommit) => {
  try {
    await booksService.update(bookInfoBeforeCommit.id, {
      isFavorite: !bookInfoBeforeCommit.isFavorite,
    });
    return true;
  } catch (err) {
    showError(errorCatch(err));
    return false;
  }
};

export const modalTrashBtnHandler = (book) => {
  const trashBtn = document.querySelector('#btn-trash-modal');
  trashBtn.addEventListener('click', () => {
    onDeleteBook(book);
  });
};

export const modalFavoriteBtnHandler = (book) => {
  const favoriteBtn = document.querySelector('#btn-favorite-modal');
  const btnFavoriteIcon = document.getElementById(
    'modal-about-btn-favorite-icon'
  );
  const cardBtnFavoriteIcon = document.getElementById(
    `btn-favorite-icon-${book.id}`
  );
  favoriteBtn.addEventListener('click', async () => {
    if (await onCardFavoriteToggle(book)) {
      book.isFavorite = !book.isFavorite;
      btnFavoriteIcon.setAttribute('fill', book.isFavorite ? 'red' : 'gray');
      cardBtnFavoriteIcon.setAttribute(
        'fill',
        book.isFavorite ? 'red' : 'gray'
      );
    }
  });
};
