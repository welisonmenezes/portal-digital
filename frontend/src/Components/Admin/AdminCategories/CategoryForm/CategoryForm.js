import React, { Component } from 'react';

class CategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.props.location.pathname,
            title: null
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ currentPath: this.props.location.pathname });
        const regCategories = /admin\/categorias\/[0-9]/g;
        if (this.props.location.pathname === '/admin/categorias/add') {
            this.setState({ title: 'Adicionar Categoria' });
        } else if (regCategories.test(this.props.location.pathname)) {
            this.setState({ title: 'Editar Categoria' });
        }
    }

    render() {
        return (
            <div className="CategoryForm">
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{this.state.title}</h4>
                                <form className="forms-sample">
                                    <div className="form-group">
                                        <label>Nome</label>
                                        <input type="text" className="form-control" id="exampleInputUsername1"
                                            placeholder="Nome" />
                                    </div>
                                    <div className="form-group">
                                        <label>Descrição</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1"
                                            placeholder="Descrição" />
                                    </div>
                                    <button type="submit" className="btn btn-primary mr-2">Enviar</button>
                                    <button type="button" className="btn btn-light">Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CategoryForm;
