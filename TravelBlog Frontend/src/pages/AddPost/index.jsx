import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import 'easymde/dist/easymde.min.css';
import axios from '../../axios';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
export const AddPost = () => {
  const navigate = useNavigate();
  const inputFileRef = React.useRef(null);
  const isAuth = useSelector(selectIsAuth);
  //const [setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [culturPlaces, setCulturPlaces] = React.useState('');
  const [toVisitPlaces, setToVisitPlaces] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [tags, setTags] = React.useState('');
  const {id} = useParams();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const image = event.target.files[0];
      formData.append('image', image);
      const {data} = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {console.warn(err);
    alert('Ошибка файла')}
  };


  const onClickRemoveImage = () => {
    setImageUrl('')
  };

const isEditing = Boolean(id);

const onSubmit = async () => {
  try {
    //setLoading(true);

    const fields = {
      title,
      imageUrl,
      text,
      tags: tags.split(','),
      cost,
      culturPlaces,
      toVisitPlaces,
      rating,
    };
    
    const {data} = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);
    const _id = isEditing ? id : data._id
    navigate(`/posts/${_id}`);
  } catch (err) {
    console.warn(err);
    alert('Ошибка создания статьи');
  };
};

React.useEffect(() => {
 if (id) {
  axios.get(`/posts/${id}`).then(({data}) => {
    setTitle(data.title);
    setText(data.text);
    setCost(data.cost);
    setCulturPlaces(data.culturPlaces);
    setToVisitPlaces(data.toVisitPlaces);
    setRating(data.rating);
    setTags(data.tags.join(','));
    setImageUrl(data.imageUrl);
  }).catch(err => {
    console.warn(err);
    alert('Ошибка редактирования статьи');
  });
 }
}, [id]);



  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Расскажите о своём путешествии',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {//Уберешь локал и вылетит до выполнения authme
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 40 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="contained" size="small">
        Загрузить изображение
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:4300${imageUrl}`} id = {"cxz"} alt="Uploaded" />
        </>
      )}
      
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок поста"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <TextField classes={{ root: styles.tags }}
      variant="standard"
      placeholder="Тэги. Используйте английский язык..."
      value={tags}
      onChange={(e) => setTags(e.target.value)}
      fullWidth />

      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Стоимость путешествия..."
      value={cost}
      onChange={(e) => setCost(e.target.value)}
      fullWidth />

      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Места культурного наследия..."
      value={culturPlaces}
      onChange={(e) => setCulturPlaces(e.target.value)}
      fullWidth />

      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Места для посещения..."
      value={toVisitPlaces}
      onChange={(e) => setToVisitPlaces(e.target.value)}
      fullWidth />

      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Оцените удобство передвижения, безопасность, природу, достопримечательности"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      fullWidth />

      <SimpleMDE id={"MDE"} className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} className={styles.buttons}variant='contained'>
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
          <Button className={styles.buttons} variant='contained'>Отмена</Button>
      </div>
    </Paper>
  );
};
