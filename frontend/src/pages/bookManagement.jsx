import BookTable from '../components/table/bookTable';
import BookPostForm from '../components/form/bookPostForm';

const BookManagement = () => {

  return (
    <div>
      <BookPostForm />
      <BookTable />
    </div>
  );
};

export default BookManagement;