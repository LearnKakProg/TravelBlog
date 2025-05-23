import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors, isValid}
} = useForm({
    defaultValues: {
      email: 'IvanIvanov@mail.ru',
      password: 'Ivan',
      fullName: 'Иван Иванов Иванович'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data)

    if (!data.payload) {
      return alert('Регистрация не удалась')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
  } else{
    alert('Регистрация не удалась')
  }
};

  if(isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'Укажите почту'})}
        className={styles.field} label="E-Mail" fullWidth />
      <TextField 
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', {required: 'Укажите пароль'})}
        className={styles.field} label="Пароль" fullWidth />
      <TextField 
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', {required: 'Укажите ФИО'})}
        className={styles.field} label="Полное имя" fullWidth />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
