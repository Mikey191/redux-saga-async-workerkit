# Проект redux-saga-async-workerkit.

## Минимальная конфигурация для запуска пустого приложения.

1. Установка node.js + npm.
2. Установка React через терминал: npx create-react-app "project_name"
3. Команда для запуска в терминале: npm start
4. В файле index.html очищаем все, кроме базовой структуры и <div id="root"></div>
5. В папке src удаляем все файлы кроме index.js и App.js

Корректируем файлы:

### Файл index.js:

```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
);
```

### Файл App.js:

```
import React from "react";

function App() {
  return <div className="App">

  </div>;
}

export default App;
```

## Минимальная конфигурация для запуска пустого приложения готова.

### Redux Saga - это библиотека для управления побочными эффектами в приложениях, построенных на архитектуре Redux. Она предоставляет возможность писать саги - функции, которые описывают логику обработки асинхронных операций, таких как вызовы API, обработка событий и другие побочные эффекты.

### Redux Saga построена вокруг концепции саг - это функции-генераторы, которые позволяют описывать последовательность шагов для обработки побочных эффектов. Саги выполняются параллельно с основным потоком Redux и могут быть запущены в ответ на определенные действия (actions). Они могут выполнять асинхронные операции, слушать события и диспатчить новые действия.

### Инструменты Redux Saga:
1. Саги (Sagas): Функции-генераторы, которые описывают логику обработки побочных эффектов.
2. Эффекты (Effects): Объекты, которые описывают побочные эффекты, такие как вызовы API, задержки, диспатч новых действий и другие операции.
3. Диспатч (Dispatch): Операция, которая отправляет новое действие в Redux Store.
4. Селекторы (Selectors): Функции, которые позволяют получать определенные данные из Redux Store.
5. Middleware: Redux Saga является middleware для Redux, что означает, что она обрабатывает действия перед их достижением до редьюсеров.

### Основные понятия Redux saga:
1. Workers (работники) - это функции-генераторы, которые выполняются в ответ на определенные действия (actions). Они описывают логику обработки побочных эффектов, таких как вызовы API, задержки и другие асинхронные операции. Workers запускаются форком (fork) внутри Watchers.

2. Watchers (наблюдатели) - это функции-генераторы, которые следят за определенными действиями (actions) и запускают соответствующие Workers для их обработки. Watchers используют специальные эффекты, такие как takeEvery или takeLatest, чтобы отслеживать определенные действия и запускать соответствующие Workers.

3. Effects (эффекты) - это объекты, которые описывают побочные эффекты, такие как вызовы API, задержки, диспатч новых действий и другие операции. Эффекты создаются с использованием фабричных функций, предоставляемых библиотекой Redux Saga. Некоторые из популярных эффектов включают call, put, takeEvery, takeLatest и другие.

### ГЕНЕРАТОРЫ.
Функции-генераторы в JavaScript - это специальный тип функций, которые могут быть приостановлены во время выполнения и возобновлены позже. Они используют ключевое слово yield для возврата промежуточных значений и управления потоком выполнения.
Функции-генераторы позволяют создавать итерируемые объекты, которые могут быть перебраны с помощью цикла for...of или метода next(). Каждый вызов метода next() возвращает объект со свойствами value и done. Свойство value содержит значение, возвращенное оператором yield, а свойство done указывает, завершена ли функция-генератор или нет.

Пример:
```
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const sequence = generateSequence();

console.log(sequence.next()); // { value: 1, done: false }
console.log(sequence.next()); // { value: 2, done: false }
console.log(sequence.next()); // { value: 3, done: false }
console.log(sequence.next()); // { value: undefined, done: true }
```

## СТАРТОВАЯ СТРУКТУРА ПРОЕКТА:
Устанавливаем зависимости: npm install redux react-redux redux-saga

### ФАЙЛ index.js
```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```



### ФАЙЛ App.js
```
import React from "react";
import style from "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { decrementCreator, incrementCreator } from "./store/countReducer";

function App() {
  const count = useSelector((state) => state.countReducer.count);
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="count">{count}</div>
      <div className="btns">
        <button className="btn" onClick={() => dispatch(incrementCreator())}>
          ИНКРЕМЕНТ++
        </button>
        <button className="btn" onClick={() => dispatch(decrementCreator())}>
          ДЕКРЕМЕНТ--
        </button>
        <button className="btn">ПОЛУЧИТЬ ЮЗЕРОВ</button>
      </div>
      <div className="users">
        {users.map((user) => (
          <div className="user">{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App
```



### Создаем папку store в src.
### ПАПКА store ФАЙЛ index.js
```
import { combineReducers, createStore } from "redux";
import countReducer from "./countReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  countReducer,
  userReducer,
});

export const store = createStore(rootReducer);
```


### ПАПКА store ФАЙЛ userReducer.js
```
const defaultState = {
  users: [],
};

export const SET_USERS = "SET_USERS";

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
  }
  return state;
}

export const setUsers = payload => ({type: SET_USERS, payload})
```


### ПАПКА store ФАЙЛ countReducer.js
```
const defaultState = {
  count: 0,
};

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export default function countReducer(state = defaultState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
  }
  return state;
}

export const incrementCreator = () => ({ type: INCREMENT });
export const decrementCreator = () => ({ type: DECREMENT });
```


## 1.	WORKER, WATCHER.	
    1.	Создаем папку saga. В папке создаем файл countSaga.js. В файле будут асинхронные action для работы со счетчиком.
    2.	Создаем index.js в этой же папке. В нем проинициализируем saga. И файл для action пользователей userSaga.js
    3.	В файле countSaga создаем первый worker - генератор функцию incrementWorker: function* incrementWorker(){}.
    4.	Для всех worker'ов связанных со счетчиком создадим watcher. Он будет за всеми следить: function* countWatcher(){}.
    5.	Создадим worker для декремента: function* decrementWorker(){}.
    6.	Создаем функцию для искусственной задержки. Параметром она будет принимать миллисекунды. Возвращать эта функция будет новый Promis. В callback передаем resolve что бы promes выполнился и вторым параметром миллисекунды: const delay = (ms) => new Promise(res => setTimeout(res, ms)).

    ```
    Promise в JavaScript представляет собой объект, который используется для работы с асинхронными операциями. Он представляет собой обещание о том, что в будущем будет получено значение или результат асинхронной операции.
    Когда создается новый Promise с помощью конструктора new Promise(), ему передается функция-исполнитель (executor function). Эта функциz принимает два аргумента: resolve и reject. resolve вызывается, когда асинхронная операция завершается успешно, и передает результат выполнения операции. reject вызывается, когда операция завершается с ошибкой, и передает информацию об ошибке.
    ```
  
  
## 2.	ЭФФЕКТЫ REDUX SAGA	
    1.	 Импортируем put из redux-saga: import {put} from "redux-saga/effects"
       ```
       put - это эффект, который используется для диспатча (отправки) новых действий (actions) в Redux Store. Он позволяет саге отправить новое действие, которое может быть обработано редьюсерами и изменить состояние приложения.
       ```
    2.	 Описываем логику функции incrementWorker. Перед каким-то асинхронным действием мы пишем yield delay(). Выглядит это почти так же, как и async await, т.е. следующее асинхронное действие не выполнится пока не выполнится строчка кода. Далее используем yield put() в который нам надо передать action. Для этого у нас есть функция actionCreator которая возвращает объект действия: incrementCreator().
    3.	 Что бы заставить его работать необходимо реализовать watcher. Watcher будет следить за тем, что бы этот worker был выполнен. Для watcher'a нам понадобится эффект takeEvery. Импортируем его и вызываем в функции countWatcher: yield takeEvery(). Параметром она принимает action.
       ```
       takeEvery - это эффект, который используется для отслеживания определенного действия (action) и запуска соответствующего обработчика (worker) каждый раз, когда это действие диспатчится в Redux Store. Он позволяет обрабатывать действия асинхронно и параллельно.
       ```
    4.	 Вернемся к файлу countReducer.js и создаем константу для асинхронного action: export const ASYNC_INCREMENT = "ASYNC_INCREMENT".
    5.	 Создаём action creator с названием AsyncIncrementCreator: export const AsyncIncrementCreator = () => ({ type: ASYNC_INCREMENT });
    6.	 Переходим в файл countSaga.js
    7.	 В функцию countWatcher возвращаем с помощью yield takeEvery и передаем первым параметром тип action за которым необходимо следить, а вторым параметром worker, который должен отрабатывать, когда action с таким типом будет задиспатчен.
    8.	 Переходим в папку store файл index.js
    9. 	Импортируем функцию, которая будет создавать функцию-middleware sage: import createSagaMiddleware from "redux-saga"
    10.	Создаем переменную sagaMiddleware: const sagaMiddleware = createSagaMiddleware()
    11.	В createStore вторым параметром передаем middleware. Делается это с помощью функции applyMiddleware.
    12.	Запускаем saga: вызываем функцию run() и в нее параметром необходимо передать watcher: sagaMiddleware.run(countWatcher).
    13.	Переходим в файл App.jsx .
    14.	action будем вызывать при нажатии на кнопку: <button className="btn" onClick={() => dispatch(AsyncIncrementCreator())}>
    15.	Проделываем аналогичные действия для декремента.
    16.	В файле countReducer.js Создаем константу с типом и для нее action creator.
    17.	Возвращаемся в файл countSaga и копируем логику с incrementWorker.
    18.	Далее по аналогии в countWatcher вызываем функция takeEvery и параметрами передаем action и worker.
    19.	Переходим в файл App.jsx и вызываем asyncDecrementCreator при нажатии на кнопку.
  
## 3.	СПИСОК ПОЛЬЗОВАТЕЛЕЙ jsonplaceholder	
    1.	Пользователей будем получать с помощью асинхронного запроса с сервера.
    2.	Переходим в файл userSaga.js и создаём worker-fetchUserWorker и watcher-userWatcher. Импортируем те же самые эффекты put и takeEvery.
    3.	Запрос будем делать на сервер jsonplaceholder.
    4.	Создаем функцию, которая будет отправлять запрос на restAPI с именем fetchUsersFromApi. Обязательное условие, что это функция должна возвращать Promise. Функция fetch как раз возвращает Promise: const fetchUsersFromApi = () => fetch("https://jsonplaceholder.typicode.com/users").
    5.	Для реализации Worker понадобится еще один эффект, который называется call.
       ```
       call - это эффект, который используется для вызова функций с побочными эффектами или асинхронными операциями. Он позволяет саге вызывать функции и обрабатывать их результаты. Он возвращает данные, которые прилетают к нам в Promise.
       ```
    6.	Создаем переменную data. вызываем функцию call и в нее параметром передаем Promise, который должен вернуть какие-то данные. То, что вернется в результате запроса добавится в переменную data. Когда мы работаем с fetch нам необходимо из тех данных которые мы получили вернуть json. Это можно сделать с помощью new Promise(). Результатом этого Promise будет преобразование исходных данных к формату json: const json = yield call(() => new Promise(res => res(data.json()))). Теперь в переменной json хранится массив пользователей.
    7.	Далее нам необходимо вызвать функцию put в которую передать setUsers с параметром json: yield put(setUsers(json)).
    8.	В файле userReducer создаем константу FETCH_USERS и action creator с названием fetchUsers.
    9.	В watcher вызываем функцию takeEvery куда передаем название типа action и вторым параметром worker: export function* userWatcher() { takeEvery(FETCH_USERS, fetchUserWorker) }.
    10.	Объединим watcher'ы. Переходим в папку saga файл index.js .
    11.	Из эффектов импортируем функцию all.
       ```
       all - это эффект, который используется для запуска нескольких саг параллельно. Он позволяет саге запускать несколько саг одновременно и дожидаться их завершения. эта функция своего рода глобальный watcher который следит за другими watcher.
       ```
    12.	Создаем генератор функцию rootWatcher.
    13.	В ней вызываем функцию all, параметром функция all принимает массив. И в этот массив мы передаем watcher'ы countWatcher и userWatcher.
    14.	Переходим в папку store в файл index.js.
    15.	В middleware.run передаём rootWatcher: sagaMiddleware.run(rootWatcher).
    16.	Возвращаемся к App.jsx и в onClick нашей кнопке, добавляем вызов который диспатчит тот action, creator, который мы создавали: <button className="btn" onClick={() => dispatch(fetchUsers())}>ПОЛУЧИТЬ ЮЗЕРОВ</button>
