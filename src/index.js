import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import TodoList from './components/todo-list';
import ItemStatusFilter from './components/item-status-filter';
import FormAddItem from './components/form-add-item';

import './index.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }


  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray
      }
    });
  };

  addItem = (text)=> {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArr = [
          ...todoData,
          newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  onToggleOption = (arr, id, option) => {

      const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];

      const newItem = {
        ...oldItem, [option]: !oldItem[option]
      }

      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.onToggleOption(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.onToggleOption(todoData, id, 'done')
      }
    })
  }

  search(items, term) {
    if (term === "") {
      return items
    }
    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term) > -1
    })
  }

  onSearchChange = (term) => {
    this.setState( { term } )
  }

  onFilterChange = (filter) => {
    this.setState( { filter } )
  }



  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items
    }
  }

  render () {

    const  { todoData, term, filter } = this.state;
    const visibleItem = this.filter(this.search(todoData, term), filter);
    // console.log(todoData)
    const doneCount = todoData.filter(el => el.done).length
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
      <AppHeader toDo={todoCount} done={ doneCount } />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter onFilterChange={this.onFilterChange} filter={filter} />
      </div>

      <TodoList todos={visibleItem}
      onDeleted={this.deleteItem}
      onToggleImportant={this.onToggleImportant}
      onToggleDone={this.onToggleDone}
      />
      <FormAddItem onAddItem={this.addItem}  />
    </div>
    )
  }
};

ReactDOM.render(<App />,
  document.getElementById('root'));