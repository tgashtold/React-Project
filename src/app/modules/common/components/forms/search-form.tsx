import React from 'react';
import {Button} from '../../../common';
import {Redirect} from 'react-router-dom';

interface ISearchFormProps {
    onSubmit: (searchText: string) => void;
    searchedValue: string;
    searchRoute: string;
    basicRoute: string;
    isActive?: boolean | null;
}

interface ISearchFormState {
    searchValue: string;
}

export class SearchFrom extends React.Component<ISearchFormProps, ISearchFormState> {
    constructor(props: any) {
        super(props);

        this.state = {searchValue: this.props.searchedValue || ''};
    }

    componentWillReceiveProps() {
        if (this.props.isActive === false && this.state.searchValue.length > 0) {
            this.setState({searchValue: ''});
        }
    }

    handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({searchValue: event.target.value});

        if (event.target.value.length === 0) {
            this.props.onSubmit('');
        }
    };

    handleSearchFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState({searchValue: event.target.value});
    };

    handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchValue.trim());
    };

    render() {
        return (
            <form onSubmit={(e) => this.handleSearchFormSubmit(e)} className={'searcher'}>
                <input
                    value={this.state.searchValue}
                    onChange={(e) => this.handleChanges(e)}
                    onBlur={(e) => this.handleSearchFieldBlur(e)}
                    placeholder={'Enter search request ...'}
                    className={'searcher__field'}
                    type="search"
                />
                {this.state.searchValue.length > 0 && this.props.isActive !== false
                    ? <Redirect to={`${this.props.searchRoute}${this.state.searchValue}`}/>
                    : <Redirect to={`${this.props.basicRoute}`}/>
                }
                <Button buttonTitle={'Search'}/>
            </form>
        );
    }
}
