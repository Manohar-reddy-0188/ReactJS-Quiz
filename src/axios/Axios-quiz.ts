import Axios from 'axios';

export default Axios.create( {
  baseURL: 'https://reactjs-quizapp.firebaseio.com/'
} );
