import React from 'react';
import './App.css';
// import FirstComponent from './components/learning-examples/FirstComponent';
// import SecondComponent from './components/learning-examples/SecondComponent';
// import ThirdComponent from './components/learning-examples/ThirdComponent';
// import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';
import './bootstrap.css';

function App() {
    return ( 
        <div className = "App" >
            <TodoApp/>
        </div>
    );
}

// function LearningComponents() {
//     return (
//         <div className = "learningComponents" >
//             <h1>Welcome to Note Junkie, Caylem!</h1>
//             <FirstComponent/>
//             <SecondComponent/>
//             <ThirdComponent/>
//         </div>
//     )
// }

export default App;