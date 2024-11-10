import BookEditTable from '../components/table/bookEditTable';
import BookPostForm from '../components/form/bookPostForm';

const BookManagement = () => {

  return (
    <div>
      <BookPostForm />
      <BookEditTable />
    </div>
  );
};

export default BookManagement;