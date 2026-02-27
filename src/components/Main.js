import React, { Component } from "react";
//form
import { FaPlus } from "react-icons/fa";
//tarefas
import { FaEdit, FaWindowClose } from "react-icons/fa";
import "./Main.css";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1, //se esse estado for -1, estou criando, se for diferente, estou editando
  };

  handleSubmit = (e) => {
    e.preventDefault(); //evito de atualizar a pagina ao dar submit
    const { tarefas, index } = this.state; //
    let { novaTarefa } = this.state; //pego o que está no campo
    novaTarefa = novaTarefa.trim(); //elimina os espaços no começo e final

    if (tarefas.indexOf(novaTarefa) !== -1) return; //verificar se ela ja existe nas tarefas se é diferente de -1 ele existe
    const novasTarefas = [...tarefas]; //dou spread, copio pra outra variavel n posso manipular tarefas

    //crio uma nova tarefa
    if (index === -1) {
      //se o index t vindo igual a -1 é um novo registro
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: "", //depois que insiro a nova tarefa eu limpo o campo de inserir tarefa
      });
    } else {
      //aqui eu to editando uma coisa
      novasTarefas[index] = novaTarefa; //novastarefas nesse indice agora vai ter o valor que esta sendo passado no campo input

      this.setState({
        tarefas: [...novasTarefas],
        index: -1, //ja editei, então eu volto index pra -1
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    //o edit só joga a tarefa onde eu cliquei e pro campo de ediçao, quem confirma a mudança é o botao submit de criação
    const { tarefas } = this.state;
    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1); //remove 1 elemento, nesse indice

    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            onChange={this.handleChange}
            type="text"
            value={novaTarefa}
          ></input>
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, index)} //aqui eu passo o evento por referencia, e o index, o map consegue pegar essas infos
                  className="edit"
                />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, index)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
